import SideMenu from '../component/sideMenu';
import bg3 from '../images/bg3.jpg';
import UserIdDialog from '../component/userIdDialog';
import { ChatForum } from '../component/chatForum';
import { LoginModal } from '../component/loginModal';
import { useState } from 'react';
import { useUsernameContext } from '../context/UsernameProvider';
import { useConversations } from '../context/ConversationsProvider';

export const Chats = () => {
  const { username } = useUsernameContext();
  const [mainOpen, setMainOpen] = useState(false);
  const { chat } = useConversations();

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-span-3 col-start-1  min-h-[80vh]  px-1'>
        <UserIdDialog username={username} />
        <SideMenu username={username} setMainOpen={setMainOpen} />
      </div>
      <div className='col-span-9 col-start-4 ml-[1px]'>
        <div
          className='border-2 border-blue-200 min-h-[80vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth'
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          {chat && username
            ? chat.map((c, index) => {
                return <div key={index}>{c}</div>;
              })
            : ''}
        </div>
        <ChatForum />
      </div>
      {!username ? (
        <LoginModal
          username={username}
          mainOpen={mainOpen}
          setMainOpen={setMainOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
};
