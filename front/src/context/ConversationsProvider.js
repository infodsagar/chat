import { useContext, createContext, useEffect } from 'react';
import { useSocket } from './SocketProvider';
import { useChatContext } from './localChat';

const ConversationsContext = createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
  const socket = useSocket();
  const { dispatch } = useChatContext();

  //Send Message
  const sendMessage = (text) => {
    socket.emit('send-message', { text });
    addMsg(text);
  };

  const addMsg = (text) => {
    dispatch({ type: 'ADD', payload: text });
  };

  //Waiting for message
  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMsg);

    return () => socket.off('receive-message');
  }, [socket, addMsg]);

  const value = {
    sendMessage: sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
