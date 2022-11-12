import { useState, useRef } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';
import { useConversations } from '../context/ConversationsProvider';

export const ChatForum = (props) => {
  const [text, setText] = useState('');
  const { sendMsg, sendPrivMsg } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.mode === 'PRIVATE') {
      sendPrivMsg(
        text,
        props.username,
        props.receptionId,
        props.receptionUsername
      );
      setText('');
    } else {
      sendMsg(text);
      setText('');
    }
  };

  return (
    <form className='mt-4 flex items-center' onSubmit={handleSubmit}>
      <Input
        type='text'
        size='small'
        variant='filled'
        className='w-[100%] mr-4'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <Button
        variant='contained'
        size='small'
        type='submit'
        endIcon={<SendIcon />}
      >
        Submit
      </Button>
    </form>
  );
};
