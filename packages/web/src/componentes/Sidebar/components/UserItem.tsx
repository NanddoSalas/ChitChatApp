import { useStore } from '../../../store';
import { classNames } from '../../../utils';

interface UserItemProps {
  id: number;
  avatar: string | null;
  fullName: string;
}

export const UserItem: React.FC<UserItemProps> = ({ id, avatar, fullName }) => {
  const navigate = useStore((state) => state.navigate);
  const navigationPath = useStore((state) => state.navigation);
  const isSelected =
    navigationPath.id === id && navigationPath.path === '/users/:id';
  const { unreadMessagesCount } = useStore((state) => state.directMessages[id]);

  const isOnline = isSelected;

  const handleClick = () => {
    navigate('/users/:id', id);
  };

  return (
    <a
      className={classNames(
        isSelected
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800',
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center',
      )}
      onClick={handleClick}
    >
      <div className="w-8 h-8">
        <span className="relative inline-block h-8 w-8">
          {avatar ? (
            <img className="h-8 w-8 rounded-md" src={avatar} alt="" />
          ) : (
            <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          )}

          <span className="absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white">
            {isOnline ? (
              <span className="block h-2 w-2 rounded-full bg-green-400" />
            ) : (
              <span className="block h-2 w-2 rounded-full bg-gray-400" />
            )}
          </span>
        </span>
      </div>

      <span className="truncate">{fullName}</span>

      {unreadMessagesCount ? (
        <span
          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
          aria-hidden="true"
        >
          {unreadMessagesCount}+
        </span>
      ) : null}
    </a>
  );
};
