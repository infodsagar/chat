import {
  useContext,
  useEffect,
  useState,
  createContext,
  useReducer,
} from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export const idReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { id: action.payload };
    case 'DELETE':
      return { id: '' };
    default:
      return state;
  }
};

export function SocketProvider({ children }) {
  const socket = io('http://localhost:4000', { autoConnect: false });
  const [allUsers, setAllUsers] = useState([]);
  const [state, dispatch] = useReducer(idReducer, { id: '' });

  //Make connection to server
  const connectUser = (userName) => {
    socket.auth = { userName };
    socket.connect();
  };

  //Error catcher
  socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
      console.log(err.message);
    }
  });

  //List of all connected user
  useEffect(() => {
    socket.on('users', (users) => {
      users = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setAllUsers(users);
    });
  }, [socket]);

  //Return newly connected user
  socket.on('user connected', (user) => {});

  //Socket connect
  socket.on('connect', () => {
    dispatch({ type: 'ADD', payload: socket.id });
  });

  return (
    <SocketContext.Provider
      value={{ socket, connectUser, allUsers, dispatch, ...state }}
    >
      {children}
    </SocketContext.Provider>
  );
}
