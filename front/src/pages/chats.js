import { ChatForum } from '../component/chatForum';
import bg3 from '../images/bg3.jpg';
import { useChatContext } from '../context/localChat';
import { LoginModal } from '../component/loginModal';
import { useUserContext } from '../context/localUser';
import SideMenu from '../component/sideMenu';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Chats = () => {
  const { chat } = useChatContext();
  const { user } = useUserContext();
  const [mainOpen, setMainOpen] = useState(false);

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-span-3 col-start-1  min-h-[80vh]  px-1'>
        <h1 className='text-xl bg-lime-300 text-center font-medium rounded-lg mt-2 flex justify-center'>
          <AccountCircleIcon className='mt-[2px] mx-2' />
          {user ? user : ''}
        </h1>
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
