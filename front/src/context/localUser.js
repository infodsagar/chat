import { createContext, useEffect, useReducer, useContext } from 'react';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: '' };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      console.log('set user');
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
