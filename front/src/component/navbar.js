import { Link } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useRef, useEffect } from 'react';
import UserIdDialog from '../component/userIdDialog';
import { useUsernameContext } from '../context/UsernameProvider';
import { useConversations } from '../context/ConversationsProvider';

export const Navbar = () => {
  const { username } = useUsernameContext();

  const [open, setOpen] = useState(null);
  const ref1 = useRef();
  const ref2 = useRef();
  const { sideOpen, setSideOpen } = useConversations();

  const handleDrop2 = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!ref2.current.contains(e.target)) {
        if (open && ref1.current && !ref1.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open]);

  return (
    <>
      <div className='flex border-b-[1px] border-black shadow-md min-h-[50px] items-center'>
        {/* Burger menu for mobile nav*/}
        <span className='ml-10 my-1 sm:hidden'>
          <Button
            variant='contained'
            size='small'
            onClick={handleDrop2}
            ref={ref2}
          >
            {open ? <CloseIcon /> : <DehazeIcon />}
          </Button>
        </span>
        <span className='ml-[auto] mr-10 my-1 sm:hidden'>
          <UserIdDialog
            username={username}
            sideOpen={sideOpen}
            setSideOpen={setSideOpen}
          />
        </span>

        <span className='text-lg ml-4 md:ml-8 lg:ml-12 hidden sm:flex  hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/'>Home</Link>
        </span>
        <span className='text-lg ml-4 md:ml-8 lg:ml-12 mr-2 hidden sm:flex hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/notes'>Notes</Link>
        </span>
        <span className='text-lg ml-4 md:ml-8 lg:ml-12 mr-2 hidden sm:flex hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/chats'>Chats</Link>
        </span>
        <nav className='ml-auto mr-4 md:mr-6 hidden md:flex'></nav>
      </div>

      <Box sx={{ flexGrow: 1 }} ref={ref1}>
        <Grid container>
          <Grid xs={3}>
            <ul
              className={
                open
                  ? 'py-4 px-20 z-10  md:hidden bg-white absolute border-black border-r-[1px] border-b-[1px] rounded-md shadow-md opacity-100'
                  : 'hidden'
              }
            >
              <li
                className=' text-lg hover:border-b-blue-300 hover:border-b-[2px] '
                onClick={handleDrop2}
              >
                <Link to='/'>Home</Link>
              </li>

              <li
                className='mt-4 text-lg hover:border-b-blue-300 hover:border-b-[2px]'
                onClick={handleDrop2}
              >
                <Link to='/notes'>Notes</Link>
              </li>

              <li
                className='mt-4 text-lg hover:border-b-blue-300 hover:border-b-[2px]'
                onClick={handleDrop2}
              >
                <Link to='/chats'>Chats</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
