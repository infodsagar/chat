import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import ContactsIcon from '@mui/icons-material/Contacts';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useUsernameContext } from '../context/UsernameProvider';
import { useChatContext } from '../context/localChat';
import { ContactsModal } from './contactsModal';
import { useState } from 'react';
import { useConversations } from '../context/ConversationsProvider';

export default function SideMenu(props) {
  const [mainOpen, setMainOpen] = useState(false);
  const { dispatch } = useUsernameContext();
  const { dispatch: chatDispatch } = useChatContext();
  const { disconnectUser, usersList } = useConversations();

  const handleLogout = () => {
    localStorage.setItem('username', null);
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
        {props.username ? (
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
        {props.username ? (
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
        {usersList && props.username ? (
          <div>
            <Divider />
            {usersList.map((u, index) => {
              if (u.username === 'null') {
                return;
              } else {
                return (
                  <MenuItem key={index}>
                    <ListItemIcon>
                      <PersonIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>{u.username}</ListItemText>
                  </MenuItem>
                );
              }
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
