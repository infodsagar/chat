import { useState, useRef } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNotesContext } from '../hooks/useNotesContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';

export const NoteForum = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();
  const inputRef = useRef();
  const triggerFile = () => {
    inputRef.current.click();
  };

  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('text', text);

  const note = { text };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!user) {
      setError('Please login');
      setIsLoading(false);
    }

    if (!text && !file) {
      setError(`Can't submit empty response`);
      setIsLoading(false);
    }

    //Text only
    if (!file && text) {
      console.log('text only ' + text);

      const response = await fetch('/api/notes/text', {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }

      if (response.ok) {
        setText('');
        setFile(null);
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    } else {
      //File
      console.log('file and text or file only');
      const response = await fetch('/api/notes', {
        method: 'POST',
        body: formdata,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
      }

      if (response.ok) {
        setText('');
        setFile(null);
        console.log('new note added');
        dispatch({ type: 'CREATE_NOTE', payload: json });
        setIsLoading(false);
      }
    }
  };

  return (
    <form className='mt-4 flex items-center' onSubmit={handleSubmit}>
      <input
        type='file'
        className='border-2 border-blue-200 hidden'
        onChange={(event) => {
          setFile(event.target.files[0]);
        }}
        onClick={(e) => {
          e.target.value = null;
        }}
        ref={inputRef}
      />
      <Input
        type='text'
        size='small'
        variant='filled'
        className='w-[100%]'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <AttachFileIcon
        color='primary'
        className='max-w-[30px] cursor-pointer mx-1'
        onClick={triggerFile}
      />
      <Button
        variant='contained'
        size='small'
        disabled={isLoading}
        type='submit'
        endIcon={<SendIcon />}
      >
        Submit
      </Button>
      {error}
    </form>
  );
};
