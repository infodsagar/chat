import { createContext, useEffect, useReducer, useContext } from 'react';

export const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export const chatReducer = (state, action) => {
  switch (action.type) {
    case 'EXISTS':
      return { chat: action.payload };
    case 'ADD':
      return { chat: [...state.chat, action.payload] };
    case 'DELETE':
      return { chat: [] };
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, { chat: [] });

  // console.log(state.chat);

  useEffect(() => {
    const chat = JSON.parse(localStorage.getItem('chat'));

    if (chat) {
      // console.log('step-a');
      if (chat.length > state.chat.length) {
        // console.log('stpe-b');
        dispatch({ type: 'EXISTS', payload: chat });
      }
    }
  }, []);

  useEffect(() => {
    const chat = JSON.parse(localStorage.getItem('chat'));
    if (state.chat.length === 0 && !chat) {
      // console.log('step - 1');
      return;
    } else if (state.chat.length > 0 && !chat) {
      // console.log('step - 2');
      localStorage.setItem('chat', JSON.stringify(state.chat));
    } else if (state.chat.length > chat.length) {
      // console.log('step - 3');
      localStorage.setItem('chat', JSON.stringify(state.chat));
    }
  }, [state, dispatch]);

  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
