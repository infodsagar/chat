import { useConversations } from '../context/ConversationsProvider';

export const ChatRender = (props) => {
  const { chat, privChat } = useConversations();
  const regex = new RegExp('^[s].*');

  return (
    <>
      <div className='bg-sky-200'>
        <span className='pr-6'>Mode: {props.mode}</span>
        <span>
          {props.receptionUsername
            ? `Username: ${props.receptionUsername}`
            : ''}
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
                      <span className='bg-white rounded-md p-1'>
                        {chat[key]}
                      </span>
                    </div>
                  );
                }
              })
            : ''}
        </div>
      ) : (
        <div>
          {privChat[props.receptionUsername] && props.receptionUsername
            ? privChat[props.receptionUsername].map((c, index) => {
                return <div key={index}>{c}</div>;
              })
            : ''}
        </div>
      )}
    </>
  );
};
