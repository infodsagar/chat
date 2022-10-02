import { ChatForum } from '../component/chatForum';
import bg3 from '../images/bg3.jpg';
import { useState } from 'react';
import io from 'socket.io-client';

export const Chats = () => {
  const socket = io();
  const [msg, setMsg] = useState([]);
  console.log(msg);
  socket.on('message', (message) => {
    console.log(message);
    setMsg([...msg, message]);
  });

  const chatSubmit = (chatText) => {
    socket.emit('chatMessage', chatText);
  };

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-span-3 col-start-1  min-h-[80vh] px-1'>
        <h1 className='text-xl bg-lime-300 text-center font-medium rounded-lg mt-2'>
          Contact
        </h1>
        <ul className='mt-2'>
          <li className='border-b-[1px] border-red-200 text-lg'>Sagar</li>
          <li className='border-b-[1px] border-red-200 text-lg'>Leo</li>
        </ul>
      </div>
      <div className='col-span-9 col-start-4 ml-[1px]'>
        <div
          className='border-2 border-blue-200 min-h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth'
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          {msg
            ? msg.map((m, index) => {
                return <div key={index}>{m}</div>;
              })
            : ''}
        </div>
        <ChatForum chatSubmit={chatSubmit} />
      </div>
    </div>
  );
};
