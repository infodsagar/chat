import { useSocket } from './SocketProvider';
import { useContext, createContext, useEffect, useState } from 'react';
import LocalStorage from '../hooks/LocalStore';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const socket = useSocket();
  const [id, setId] = useState();
  const [usersList, setUsersList] = useState();
  const [chat, setChat] = LocalStorage('chat', []);
  const [privChat, setPrivChat] = LocalStorage('privChat', {});

  //Connect user
  const connectUser = () => {
    socket.connect();
  };

  //Send General msg
  const sendMsg = (msg) => {
    socket.emit('send-message', msg);
    setChat([...chat, msg]);
  };

  //Send Priv msg
  const sendPrivMsg = (msg, username, receptionId, receptionUsername) => {
    socket.emit('private-message', { msg, username, receptionId });
    if (privChat.hasOwnProperty(receptionUsername)) {
      setPrivChat({
        [receptionUsername]: [...privChat[receptionUsername], msg],
      });
    } else {
      setPrivChat({ [receptionUsername]: [msg] });
    }
  };

  //Receive priv msg
  const handlePriv = (msg, senderUsername, from) => {
    if (privChat.hasOwnProperty(senderUsername)) {
      setPrivChat({ [senderUsername]: [...privChat[senderUsername], msg] });
    } else {
      setPrivChat({ [senderUsername]: [msg] });
    }
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

    //On receive general msg
    socket.on('receive-message', (msg) => {
      setChat([...chat, msg]);
    });

    //On receive private msg
    socket.on('receive-priv-message', ({ msg, senderUsername, from }) => {
      handlePriv(msg, senderUsername, from);
    });

    return () => socket.off('receive-message');
  }, [socket, sendMsg]);

  return (
    <ConversationsContext.Provider
      value={{
        sendMsg,
        sendPrivMsg,
        disconnectUser,
        connectUser,
        id,
        usersList,
        chat,
        privChat,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
