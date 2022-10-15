import { createContext, useEffect, useReducer, useContext } from 'react';

export const UsernameContext = createContext();

export function useUsernameContext() {
  return useContext(UsernameContext);
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { username: action.payload };
    case 'LOGOUT':
      return { username: null };
    default:
      return state;
  }
};

export const UsernameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { username: null });

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('username'));

    if (username) {
      dispatch({ type: 'LOGIN', payload: username });
    }
  }, []);

  return (
    <UsernameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UsernameContext.Provider>
  );
};
