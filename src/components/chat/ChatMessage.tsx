import { format } from 'date-fns';
import { ChatMessageDto } from '../../types';
import { clsx } from 'clsx';

interface ChatMessageProps {
  message: ChatMessageDto;
  isOwn: boolean;
}

const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  const timestamp = new Date(message.timestamp);
  
  return (
    <div
      className={clsx(
        'mb-4 max-w-[80%]',
        isOwn ? 'ml-auto' : 'mr-auto'
      )}
    >
      <div
        className={clsx(
          'p-3 rounded-lg',
          isOwn 
            ? 'bg-primary-500 text-white rounded-br-none' 
            : 'bg-white border border-gray-200 rounded-bl-none'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
      </div>
      <div
        className={clsx(
          'text-xs mt-1',
          isOwn ? 'text-right text-gray-500' : 'text-gray-500'
        )}
      >
        {format(timestamp, 'h:mm a')}
      </div>
    </div>
  );
};

export default ChatMessage;