import { Link } from 'react-router-dom';
export const Home = () => {
  return (
    <>
      <div className='flex items-center flex-col'>
        <span className='mt-10 pb-2 px-2 text-2xl '>
          Welcome
          <div className='border-b-[2px] border-blue-400 shadow-md min-h-[4px]'></div>
        </span>
        <span className='text-lg mt-2 md:px-4 flex flex-col items-center md:flex-row sm:flex-row'>
          <span>Make new friends</span>
          {/* <span className='md:pl-1 sm:pl-1'>Create Public chat </span>
          <span className='md:pl-1 sm:pl-1'> or Private...</span> */}
          <span className='md:pl-1 sm:pl-1 text-blue underline text:lg'>
            <Link to='/chats'>Let's Start Chat...</Link>
          </span>
        </span>
      </div>
    </>
  );
};
