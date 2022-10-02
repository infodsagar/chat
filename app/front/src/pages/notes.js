import { NoteForum } from '../component/noteForum';
import { useEffect, useContext } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { NoteDetails } from '../component/notesDetails';
import { useLogout } from '../hooks/useLogout';
import { SnackbarContext } from '../context/snackbar';
import bg3 from '../images/bg3.jpg';

export const Notes = () => {
  const { user } = useAuthContext();
  const { dispatch, notes } = useNotesContext();
  const { logout } = useLogout();
  const setStateSnackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    const featchNotes = async () => {
      const response = await fetch('/api/notes', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json });
      } else {
        logout();
        return setStateSnackbarContext(
          true,
          'Login session expired!!',
          'warning'
        );
      }
    };
    if (user) {
      featchNotes();
    }
  }, [dispatch, user]);

  return (
    <div className='mt-2 grid grid-cols-12'>
      <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-4 lg:col-span-4 lg:col-start-5'>
        <div
          className='border-2 border-blue-200 min-h-[70vh] h-[75vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth'
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          {notes &&
            notes.map((note) => {
              return <NoteDetails note={note} />;
            })}
        </div>
        <NoteForum />
      </div>
    </div>
  );
};
