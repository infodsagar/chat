import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export const NoteDetails = ({ note }) => {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();
  const { text, fileUrl } = note;
  const [isLoading, setIsLoading] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    const featchNotes = async () => {
      const response = await fetch('api/notes', {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_NOTES', payload: json });
      }
    };
    if (user) {
      featchNotes();
    }
  }, [dispatch, user]);

  const handleClick = async () => {
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return;
    }

    const response = await fetch('/api/notes/' + note._id, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(true);
      dispatch({ type: 'DELETE_NOTE', payload: json });
    }
  };

  return (
    <div className='flex mb-2 items-center' key={note.id}>
      <div className='bg-blue-400 px-2 py-1 ml-4 mt-2 rounded-lg'>
        {fileUrl ? (
          <img
            src={fileUrl}
            alt='img box'
            className='max-w-[200px] mb-1 rounded-lg'
          />
        ) : (
          ''
        )}
        {text ? <span className='text-white text-xl'>{text}</span> : ''}
      </div>
      <button onClick={handleClick} disabled={isLoading}>
        <DeleteIcon color='disabled' size='small' className='max-w-[18px]' />
      </button>
      {text ? (
        <button>
          <ContentCopyIcon
            color='disabled'
            size='small'
            className='max-w-[18px]'
            onClick={handleCopy}
          />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};
