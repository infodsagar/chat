import { useConversations } from '../context/ConversationsProvider';

export const ChatRender = (props) => {
  const { chat, privChat } = useConversations();
  console.log(chat);

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
        <div>
          {chat && props.username
            ? chat.map((c, index) => {
                return <div key={index}>{c}</div>;
              })
            : ''}{' '}
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
