import SideMenu from '../component/sideMenu';
import bg3 from '../images/bg3.jpg';
import UserIdDialog from '../component/userIdDialog';
import { ChatForum } from '../component/chatForum';
import { LoginModal } from '../component/loginModal';
import { useState, useEffect, useRef } from 'react';
import { useUsernameContext } from '../context/UsernameProvider';
import { ChatRender } from '../component/chatRender';
import { useConversations } from '../context/ConversationsProvider';

export const Chats = () => {
  const { username } = useUsernameContext();
  const [mainOpen, setMainOpen] = useState(false);
  const [mode, setMode] = useState('PUBLIC'); //Mode tracker
  const [receptionId, setReceptionId] = useState(); //Priv message receiver ID
  const [receptionUsername, setReceptionUsername] = useState(); //Receiver username
  const { sideOpen, setSideOpen, ref3 } = useConversations();
  const ref1 = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!ref3.current.contains(e.target)) {
        if (sideOpen && ref1.current && !ref1.current.contains(e.target)) {
          setSideOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [sideOpen]);

  return (
    <div className='mt-2 grid grid-cols-12 mx-2'>
      <div className='col-start-1 sm:col-span-5 md:col-span-3 md:col-start-2  min-h-[75vh] px-1 hidden sm:flex flex-col'>
        <UserIdDialog username={username} setMainOpen={setMainOpen} />
        <SideMenu
          username={username}
          setMainOpen={setMainOpen}
          setReceptionId={setReceptionId}
          setMode={setMode}
          setReceptionUsername={setReceptionUsername}
          mode={mode}
        />
      </div>
      <div className='col-span-12 col-start-1 sm:col-span-7 sm:col-start-6 md:col-span-7 md:col-start-5 ml-[1px]'>
        <div
          className='border-2 border-blue-200 min-h-[70vh] max-h-[70vh] overflow-y-auto overflow-x-hidden scroll-smooth'
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
      <div
        ref={ref1}
        className={
          sideOpen ? 'absolute right-1 ml-[50%]  px-1 sm:hidden ' : 'hidden'
        }
      >
        <SideMenu
          username={username}
          setMainOpen={setMainOpen}
          setReceptionId={setReceptionId}
          setMode={setMode}
          setReceptionUsername={setReceptionUsername}
          mode={mode}
          setSideOpen={setSideOpen}
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
