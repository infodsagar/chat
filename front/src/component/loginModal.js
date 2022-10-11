import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import LoginIcon from '@mui/icons-material/Login';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/localUser';
import { useSocket } from '../context/SocketProvider';

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

export const LoginModal = (props) => {
  const handleOpen = () => props.setMainOpen(true);
  const handleClose = () => props.setMainOpen(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState({ status: false, details: '' });
  const { dispatch } = useUserContext();
  const { connectUser } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName === '') {
      setError({ status: true, details: `Username can't be blank` });
      return;
    } else if (userName.length < 8) {
      setError({
        status: true,
        details: `Please enter 8 or more character`,
      });
      return;
    } else {
      connectUser(userName);
      localStorage.setItem('user', JSON.stringify(userName));
      dispatch({ type: 'LOGIN', payload: userName });
      setUserName('');
      props.setMainOpen(false);
      setError({ status: false, details: '' });
    }
  };

  useEffect(() => {
    if (!props.user) {
      props.setMainOpen(true);
    } else {
      props.setMainOpen(false);
    }
  }, []);

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
            Please set Username!!
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputLabel>{error.status ? error.details : ''}</InputLabel>
            <Input
              type='text'
              size='small'
              variant='filled'
              className='w-[100%]'
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
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
