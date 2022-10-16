import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { useUsernameContext } from '../context/UsernameProvider';
import { useConversations } from '../context/ConversationsProvider';
import PublicIcon from '@mui/icons-material/Public';

export default function SideMenu(props) {
  const { dispatch } = useUsernameContext();
  const { usersList } = useConversations();

  const handleLogout = () => {
    localStorage.setItem('username', null);
    dispatch({ type: 'LOGOUT' });
    props.setMode('GENERAL');
    props.setReceptionId('');
    props.setReceptionUsername('');
  };

  const handleLogin = () => {
    props.setMainOpen(true);
  };

  const handleClick = (u) => {
    props.setMode('PRIVATE');
    props.setReceptionId(u.userID);
    props.setReceptionUsername(u.username);
  };

  const handleMode = () => {
    props.setMode('GENERAL');
    props.setReceptionId('');
    props.setReceptionUsername('');
  };

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        {props.username ? (
          <div>
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
        {props.mode === 'PRIVATE' ? (
          <MenuItem onClick={handleMode}>
            <ListItemIcon>
              <PublicIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>Public mode</ListItemText>
          </MenuItem>
        ) : (
          ''
        )}
        {usersList && props.username ? (
          <div>
            <Divider />
            {usersList.map((u, index) => {
              if (!u.username === 'null' || u.username === props.username) {
                return <div key={index}>{''}</div>;
              } else {
                return (
                  <MenuItem key={index} onClick={() => handleClick(u)}>
                    <ListItemIcon>
                      <PersonIcon fontSize='small' />
                    </ListItemIcon>
                    <ListItemText>{u.username}</ListItemText>
                    <div className=' rounded-[50%] border-[5px] border-green-600 bg-green-600'></div>
                  </MenuItem>
                );
              }
            })}
          </div>
        ) : (
          ''
        )}
      </MenuList>
    </Paper>
  );
}
