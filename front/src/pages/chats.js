import { ChatForum } from '../component/chatForum';
import bg3 from '../images/bg3.jpg';
import { LoginModal } from '../component/loginModal';
import SideMenu from '../component/sideMenu';
import { useState } from 'react';
import UserIdDialog from '../component/userIdDialog';
import { useSocket } from '../context/SocketProvider';
import { useChatContext } from '../context/localChat';
import { useUserContext } from '../context/localUser';

export const Chats = () => {
  const { chat } = useChatContext();
  const { user } = useUserContext();
  const [mainOpen, setMainOpen] = useState(false);

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-span-3 col-start-1  min-h-[80vh]  px-1'>
        <UserIdDialog user={user} />
        <SideMenu user={user} setMainOpen={setMainOpen} />
      </div>
      <div className='col-span-9 col-start-4 ml-[1px]'>
        <div
          className='border-2 border-blue-200 min-h-[80vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth'
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          {chat
            ? chat.map((c, index) => {
                return <div key={index}>{c}</div>;
              })
            : ''}
        </div>
        <ChatForum />
      </div>
      {!user ? (
        <LoginModal user={user} mainOpen={mainOpen} setMainOpen={setMainOpen} />
      ) : (
        ''
      )}
    </div>
  );
};
