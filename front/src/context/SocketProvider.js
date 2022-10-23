import { useContext, createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useUsernameContext } from './UsernameProvider';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { username } = useUsernameContext();

  useEffect(() => {
    // const newSocket = io('http://localhost:4000', {
    //   query: { username },
    // });

    const newSocket = io('https://sagar-chat.herokuapp.com/', {
      query: { username },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [username]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
