import { createContext, useEffect, useReducer, useContext } from 'react';

export const ContactsContext = createContext();

export function useContactsContext() {
  return useContext(ContactsContext);
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'EXISTS':
      return { contacts: action.payload };
    case 'ADD':
      return { contacts: [...state.contacts, action.payload] };
    case 'DELETE':
      return { contacts: [] };
    default:
      return state;
  }
};

export const ContactsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { contacts: [] });

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      dispatch({ type: 'EXISTS', payload: contacts });
    }
  }, []);

  return (
    <ContactsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ContactsContext.Provider>
  );
};
