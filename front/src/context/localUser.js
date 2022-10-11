import { createContext, useEffect, useReducer, useContext } from 'react';
import { useSocket } from '../context/SocketProvider';

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });
  const { id, connectUser } = useSocket();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && !id) {
      dispatch({ type: 'LOGIN', payload: user });
      connectUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
