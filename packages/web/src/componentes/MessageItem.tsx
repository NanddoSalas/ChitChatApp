import { useStore } from '../store';
import { Message } from '../types/resources';
import { classNames } from '../utils';
import { Avatar } from './Avatar';

interface MessageProps {
  message: Message;
  isMine?: boolean;
}

export const MessageItem: React.FC<MessageProps> = ({ message, isMine }) => {
  const getUser = useStore((state) => state.getUser);
  const user = getUser(message.sendById);

  return (
    <div
      className={classNames(
        'py-5 flex space-x-3 px-4 sm:px-6 lg:px-8',
        isMine ? 'bg-gray-200' : '',
      )}
    >
      <div className="w-12">
        <Avatar avatar={user?.avatar || ''} size="lg" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-semibold space-x-2">
          <span className="text-gray-900 text-sm">{user?.fullName}</span>

          <span className="text-gray-500 text-xs">
            {message.sendAt.toDateString()}
          </span>
        </p>

        <p className="text-sm">{message.messageBody}</p>
      </div>
    </div>
  );
};
