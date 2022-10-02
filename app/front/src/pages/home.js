import { useAuthContext } from '../hooks/useAuthContext';

export const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <div className='flex items-center flex-col'>
        <span className='mt-10 pb-2 px-2 text-2xl '>
          Welcome {user ? user.name : ''}
          <div className='border-b-[2px] border-blue-400 shadow-md min-h-[4px]'></div>
        </span>
        <span className='text-lg mt-2 md:px-4 flex flex-col items-center md:flex-row sm:flex-row'>
          <spann>Create personalised notes,</spann>
          <span className='md:pl-1 sm:pl-1'> Access it from anywhere</span>
          <span className='md:pl-1 sm:pl-1'> & any device...</span>
        </span>
      </div>
    </>
  );
};
