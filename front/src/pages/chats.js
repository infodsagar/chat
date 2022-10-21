import SideMenu from '../component/sideMenu';
import bg3 from '../images/bg3.jpg';
import UserIdDialog from '../component/userIdDialog';
import { ChatForum } from '../component/chatForum';
import { LoginModal } from '../component/loginModal';
import { useState } from 'react';
import { useUsernameContext } from '../context/UsernameProvider';
import { ChatRender } from '../component/chatRender';

export const Chats = () => {
  const { username } = useUsernameContext();
  const [mainOpen, setMainOpen] = useState(false);
  const [mode, setMode] = useState('PUBLIC');
  const [receptionId, setReceptionId] = useState();
  const [receptionUsername, setReceptionUsername] = useState();

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-span-3 col-start-1  min-h-[80vh]  px-1'>
        <UserIdDialog username={username} />
        <SideMenu
          username={username}
          setMainOpen={setMainOpen}
          setReceptionId={setReceptionId}
          setMode={setMode}
          setReceptionUsername={setReceptionUsername}
          mode={mode}
        />
      </div>
      <div className='col-span-9 col-start-4 ml-[1px]'>
        <div
          className='border-2 border-blue-200 min-h-[80vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scroll-smooth'
          style={{
            backgroundImage: `url(${bg3})`,
          }}
        >
          <ChatRender
            mode={mode}
            username={username}
            receptionUsername={receptionUsername}
          />
        </div>
        <ChatForum
          mode={mode}
          receptionId={receptionId}
          username={username}
          receptionUsername={receptionUsername}
        />
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
