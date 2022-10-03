import { ChatForum } from '../component/chatForum';
import bg3 from '../images/bg3.jpg';
import { useState, useEffect, useContext } from 'react';
import { useSocket } from '../context/SocketProvider';
import { useConversations } from '../context/ConversationsProvider';

export const Chats = () => {
  const [userId, setUserId] = useState();
  const socket = useSocket();
  const { message } = useConversations();

  useEffect(() => {
    if (socket == null) return;

    socket.on(
      'connect',
      () => {
        setUserId(socket.id);
      },
      [socket]
    );

    return () => socket.off('connect');
  }, [socket]);

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
          {userId ? (
            <div className='bg-blue-300 text-lg pl-8'>User id:- {userId}</div>
          ) : (
            ''
          )}
          {message
            ? message.map((m, index) => {
                return <div key={index}>{m}</div>;
              })
            : ''}
        </div>
        <ChatForum />
      </div>
    </div>
  );
};
