import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContactsIcon from '@mui/icons-material/Contacts';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { useUserContext } from '../context/localUser';
import { useChatContext } from '../context/localChat';
import { ContactsModal } from './contactsModal';
import { useState } from 'react';
import { useContactsContext } from '../context/ContactsProvder';
import PersonIcon from '@mui/icons-material/Person';

export default function SideMenu(props) {
  const [mainOpen, setMainOpen] = useState(false);
  const { dispatch } = useUserContext();
  const { dispatch: chatDispatch } = useChatContext();
  const { contacts } = useContactsContext();
  console.log(contacts);

  const handleLogout = () => {
    localStorage.setItem('user', null);
    localStorage.setItem('chat', null);
    dispatch({ type: 'LOGOUT' });
    chatDispatch({ type: 'DELETE' });
  };

  const handleLogin = () => {
    props.setMainOpen(true);
  };

  const handleContact = () => {
    setMainOpen(true);
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        {props.user ? (
          <div>
            <MenuItem onClick={handleContact}>
              <ListItemIcon>
                <ContactsIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Add Contact</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <MeetingRoomIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Join Room</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AddIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Create Room</ListItemText>
            </MenuItem>
          </div>
        ) : (
          ''
        )}

        <Divider />
        {props.user ? (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <LoginIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </MenuItem>
        )}
        {contacts && props.user ? (
          <div>
            <Divider />
            {contacts.map((c, index) => {
              return (
                <MenuItem key={index}>
                  <ListItemIcon>
                    <PersonIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText>{c.name}</ListItemText>
                </MenuItem>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </MenuList>

      {mainOpen ? (
        <ContactsModal mainOpen={mainOpen} setMainOpen={setMainOpen} />
      ) : (
        ''
      )}
    </Paper>
  );
}
