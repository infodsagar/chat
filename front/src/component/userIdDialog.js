import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useConversations } from '../context/ConversationsProvider';

const style = {
  '&:hover': {
    backgroundColor: '#67c700',
  },
  backgroundColor: '#b8ff6b',
  color: '#000000',
  borderRadius: 3,
  width: '320px',
  maxWidth: '100%',
  padding: '0 0 0 0',
  fontSize: 18,
  fontWeight: 'bold',
};

function SimpleDialog(props) {
  const { onClose, open } = props;
  const [subOpen, setSubOpen] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    if (props.username && props.id) {
      navigator.clipboard.writeText(props.id);
      handleSubOpen();
    } else {
      props.setMainOpen(true);
    }
  };

  const handleSubOpen = () => {
    setSubOpen(true);
    setTimeout(() => {
      setSubOpen(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        {props.username && props.id ? 'Your user ID:' : 'Login Please'}
      </DialogTitle>
      {props.username && props.id ? (
        <List sx={{ pt: 0 }}>
          <ListItem autoFocus button onClick={() => handleListItemClick()}>
            {props.id ? props.id : ''}
          </ListItem>
          {subOpen ? <ListItem>Text copied!</ListItem> : ''}
        </List>
      ) : (
        <List sx={{ pt: 0 }}>
          <ListItem autoFocus button onClick={() => handleListItemClick()}>
            Login
          </ListItem>
        </List>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function UserIdDialog(props) {
  const [open, setOpen] = useState(false);
  const { id } = useConversations();

  const handleClickOpen = () => {
    if (window.innerWidth >= 640) {
      setOpen(true);
    } else {
      props.setSideOpen(!props.sideOpen);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} sx={style}>
        <AccountCircleIcon className='mt-[1px] mx-2' />
        <span className='pr-2'>{props.username ? props.username : ''}</span>
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        id={id}
        username={props.username}
        setMainOpen={props.setMainOpen}
      />
    </div>
  );
}
