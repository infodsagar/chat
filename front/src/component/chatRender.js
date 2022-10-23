import { useConversations } from '../context/ConversationsProvider';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const ChatRender = (props) => {
  const { chat, privChat } = useConversations();
  const regex = new RegExp('^[s].*');

  const handleClick = () => {
    props.setSideOpen(!props.sideOpen);
  };

  return (
    <>
      <div className='bg-blue-100 flex'>
        <span className='pr-6 ml-[auto]'>Mode: {props.mode}</span>
        <span className='mr-4'>
          {props.receptionUsername ? `User: ${props.receptionUsername}` : ''}
        </span>
      </div>
      {props.mode === 'PUBLIC' ? (
        <div className='mt-3 mx-3'>
          {chat && props.username
            ? Object.keys(chat).map((key, index) => {
                if (regex.test(key)) {
                  return (
                    <div key={index} className='mb-2 text-white p-1 flex'>
                      <span className='bg-black rounded-md px-2 py-1 ml-[auto]'>
                        {chat[key]}
                      </span>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className='mb-2 px-2 py-1 flex'>
                      <span className='bg-white rounded-md p-1 border-[1px] border-black'>
                        {chat[key]}
                      </span>
                    </div>
                  );
                }
              })
            : ''}
        </div>
      ) : (
        <div className='mt-3 mx-3'>
          {privChat[props.receptionUsername] && props.receptionUsername
            ? Object.keys(privChat[props.receptionUsername]).map(
                (key, index) => {
                  if (regex.test(key)) {
                    return (
                      <div key={index} className='mb-2 text-white p-1 flex'>
                        <span className='bg-black rounded-md px-2 py-1 ml-[auto]'>
                          {privChat[props.receptionUsername][key]}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className='mb-2 px-2 py-1 flex'>
                        <span className='bg-white rounded-md p-1 border-[1px] border-black'>
                          {privChat[props.receptionUsername][key]}
                        </span>
                      </div>
                    );
                  }
                }
              )
            : ''}
        </div>
      )}
    </>
  );
};
