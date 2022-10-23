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
  const [chat, setChat] = LocalStorage('chat', {});
  const [privChat, setPrivChat] = LocalStorage('privChat', {});
  const [sideOpen, setSideOpen] = useState(false); //Track mobile sidemenu display status

  //Connect user
  const connectUser = () => {
    console.log('attempted');
    socket.connect();
  };

  //Send General msg
  const sendMsg = (msg) => {
    socket.emit('send-message', msg);
    if (Object.keys(chat).length > 0) {
      setChat({ ...chat, [`s${Object.keys(chat).length + 1}`]: msg });
    } else {
      setChat({ s1: msg });
    }
  };

  //Send Priv msg
  const sendPrivMsg = (msg, username, receptionId, receptionUsername) => {
    socket.emit('private-message', { msg, username, receptionId });
    if (privChat.hasOwnProperty(receptionUsername)) {
      setPrivChat({
        [receptionUsername]: {
          ...privChat[receptionUsername],
          [`s${Object.keys(privChat[receptionUsername]).length + 1}`]: msg,
        },
      });
    } else {
      setPrivChat({ [receptionUsername]: { s1: msg } });
    }
  };

  //Receive priv msg
  const handlePriv = (msg, senderUsername, from) => {
    if (privChat.hasOwnProperty(senderUsername)) {
      setPrivChat({
        [senderUsername]: {
          ...privChat[senderUsername],
          [`r${Object.keys(privChat[senderUsername]).length + 1}`]: msg,
        },
      });
    } else {
      setPrivChat({ [senderUsername]: { r1: msg } });
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
      if (Object.keys(chat).length > 0) {
        setChat({ ...chat, [`r${Object.keys(chat).length + 1}`]: msg });
      } else {
        setChat({ r1: msg });
      }
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
        setChat,
        setPrivChat,
        sideOpen,
        setSideOpen,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
}
