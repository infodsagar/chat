import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import LoginIcon from '@mui/icons-material/Login';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import { useContactsContext } from '../context/ContactsProvder';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style2 = {
  top: 20,
  left: '40%',
  borderRadius: 10,
};

export const ContactsModal = (props) => {
  const handleOpen = () => props.setMainOpen(true);
  const handleClose = () => props.setMainOpen(false);
  const [contact, setContact] = useState({ name: '', id: '' });
  const [error, setError] = useState({ status: false, nameErr: '', idErr: '' });
  const { contacts, dispatch } = useContactsContext();
  console.log(contacts);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    if (contact.name === '') {
      console.log('stpe-1');
      setError({ ...error, status: true, nameErr: `Name can't be blank` });
      return;
    } else if (contact.id === '') {
      console.log('step-2');
      setError({ ...error, status: true, idErr: `ID can't be blank` });
      return;
    } else {
      console.log('step-3');
      const allContacts = [...contacts, contact];
      console.log(allContacts);
      localStorage.setItem('contacts', JSON.stringify(allContacts));
      dispatch({ type: 'ADD', payload: contact });
      setContact({ name: '', id: '' });
      props.setMainOpen(false);
      setError({ status: false, nameErr: '', idErr: '' });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        open={props.mainOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Please Enter name
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputLabel>{error.status ? error.nameErr : ''}</InputLabel>
            <Input
              type='text'
              size='small'
              variant='filled'
              className='w-[100%]'
              value={contact.name}
              onChange={(e) => {
                setContact({ ...contact, name: e.target.value });
              }}
            />
            <InputLabel>{error.status ? error.idErr : ''}</InputLabel>
            <Input
              type='text'
              size='small'
              variant='filled'
              className='w-[100%]'
              value={contact.id}
              onChange={(e) => {
                setContact({ ...contact, id: e.target.value });
              }}
            />

            <Button variant='contained' size='small' type='submit' sx={style2}>
              <LoginIcon />
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
