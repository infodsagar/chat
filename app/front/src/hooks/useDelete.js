import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { SnackbarContext } from '../context/snackbar';
import { useContext } from 'react';

export const useDelete = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const setStateSnackbarContext = useContext(SnackbarContext);

  const deleteUser = async () => {
    const response = await fetch('api/users/delete', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    if (response.ok) {
      logout();
      return setStateSnackbarContext(
        true,
        'User account succesfully deleted',
        'success'
      );
    } else {
      return setStateSnackbarContext(true, 'User not found!!', 'error');
    }
  };
  return { deleteUser };
};
