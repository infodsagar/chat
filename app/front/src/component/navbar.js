import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDelete } from '../hooks/useDelete';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { deleteUser } = useDelete();
  const [open, setOpen] = useState(null);
  const [open2, setOpen2] = useState(null);
  const { ref1, ref2, ref3, ref4 } = useRef();

  const handleLogout = () => {
    logout();
    handleDrop2();
  };

  const handleDelete = () => {
    deleteUser();
    handleDrop2();
  };

  const handleDrop = () => {
    setOpen(!open);
  };

  const handleDrop2 = () => {
    setOpen2(!open2);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!ref2.current.contains(e.target)) {
        if (open2 && ref1.current && !ref1.current.contains(e.target)) {
          console.log('ref1');
          setOpen2(false);
        }
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [open2]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (!ref4.current.contains(e.target)) {
        if (open && ref3.current && !ref3.current.contains(e.target)) {
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
      <div className='flex border-b-[1px] border-black shadow-md'>
        <span className='ml-4 my-1 md:hidden'>
          <Button
            variant='contained'
            size='small'
            onClick={handleDrop2}
            ref={ref2}
          >
            <DehazeIcon />
          </Button>
        </span>

        <span className='text-lg ml-4 md:ml-8 lg:ml-12 hidden md:flex  hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/'>Home</Link>
        </span>
        <span className='text-lg ml-4 md:ml-8 lg:ml-12 mr-2 hidden md:flex hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/notes'>Notes</Link>
        </span>
        <span className='text-lg ml-4 md:ml-8 lg:ml-12 mr-2 hidden md:flex hover:border-b-blue-300 border-b-white border-b-[3px]'>
          <Link to='/chats'>Chats</Link>
        </span>
        <nav className='ml-auto mr-4 md:mr-6 hidden md:flex'>
          <div
            className={user ? 'text-lg cursor-pointer flex ' : 'hidden'}
            onClick={handleDrop}
            ref={ref3}
          >
            <span ref={ref4}>
              {user ? user.username : ''}
              {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </span>

            <button
              className={
                user && open
                  ? 'text-lg absolute mt-10 hover:border-b-blue-300 border-b-white border-b-[3px]'
                  : 'hidden'
              }
              onClick={handleDelete}
            >
              Delete account
            </button>
            <button
              className={user ? 'text-lg pl-4 ' : 'hidden'}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <span
            className={
              user
                ? 'hidden'
                : 'text-lg pl-4 hover:border-b-blue-300 border-b-white border-b-[3px]'
            }
          >
            <Link to='/login'>Login</Link>
          </span>

          <span
            className={
              user
                ? 'hidden'
                : 'text-lg pl-4 hover:border-b-blue-300 border-b-white border-b-[3px]'
            }
          >
            <Link to='/signup'>Signup</Link>
          </span>
        </nav>
      </div>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid xs={3}>
            <ul
              className={
                open2
                  ? 'py-4 px-10  md:hidden bg-white absolute border-black border-r-[1px] border-b-[1px] rounded-md shadow-md'
                  : 'hidden'
              }
              ref={ref1}
            >
              <li>{user ? user.username : ''}</li>
              <li
                className='mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px] '
                onClick={handleDrop2}
              >
                <Link to='/'>Home</Link>
              </li>
              <li
                className='mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                onClick={handleDrop2}
              >
                <Link to='/notes'>Notes</Link>
              </li>
              <li
                className='mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                onClick={handleDrop2}
              >
                <Link to='/chats'>Chats</Link>
              </li>
              <li
                onClick={handleDelete}
                className={
                  user
                    ? 'cursor-pointer mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                    : 'hidden'
                }
              >
                Delete account
              </li>
              <li
                onClick={handleLogout}
                className={
                  user
                    ? 'cursor-pointer mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                    : 'hidden'
                }
              >
                Logout
              </li>
              <li
                className={
                  !user
                    ? 'mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                    : 'hidden'
                }
                onClick={handleDrop2}
              >
                <Link to='/login'>Login</Link>
              </li>
              <li
                className={
                  !user
                    ? 'mt-4 text-lg hover:border-b-blue-300 hover:border-b-[1px]'
                    : 'hidden'
                }
                onClick={handleDrop2}
              >
                <Link to='/signup'>Signup</Link>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
