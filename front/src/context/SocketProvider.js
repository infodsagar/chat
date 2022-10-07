import { useContext, useEffect, useState, createContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
