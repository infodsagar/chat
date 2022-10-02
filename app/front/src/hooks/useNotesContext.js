import { NotesContext } from '../context/noteContext';
import { useContext } from 'react';

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw Error('Out of context');
  }
  return context;
};
