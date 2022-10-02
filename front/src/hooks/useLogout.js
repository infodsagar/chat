import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatch2 } = useNotesContext();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatch2({ type: 'SET_NOTES', payload: '' });
  };

  return { logout };
};
