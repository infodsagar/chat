import { useState, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';
// import { useConversations } from '../context/ConversationsProvider';

export const ChatForum = (props) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { sendMessage } = useConversations();

  const inputRef = useRef();

  const triggerFile = () => {
    inputRef.current.click();
  };

  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('text', text);

  const note = { text };

  const handleSubmit = (e) => {
    e.preventDefault();
    // sendMessage(text);
    setText('');
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
