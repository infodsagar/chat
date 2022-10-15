import { useSocket } from './SocketProvider';
import { useContext, createContext, useEffect, useState } from 'react';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const socket = useSocket();
  const [id, setId] = useState();
  const [usersList, setUsersList] = useState();
  const [chat, setChat] = useState([]);

  //Connect user
  const connectUser = () => {
    socket.connect();
  };

  //Send msg
  const sendMsg = (msg) => {
    socket.emit('send-message', msg);
    setChat([...chat, msg]);
  };

  //Disconnect user
  const disconnectUser = () => {
    socket.disconnect();
  };

  useEffect(() => {
    if (socket == null) return;
    //On connect
    socket.on('connection', (data) => {
      setId(data.data);
    });

    //User list tracker
    socket.on('usersList', (usersList) => {
      setUsersList(usersList);
    });

    //On receive msg
    socket.on('receive-message', (msg) => {
      setChat([...chat, msg]);
    });

    return () => socket.off('receive-message');
  }, [socket, sendMsg]);

  return (
    <ConversationsContext.Provider
      value={{ sendMsg, disconnectUser, connectUser, id, usersList, chat }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
