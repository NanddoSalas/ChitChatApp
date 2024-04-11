import { useStore } from '../../../store';
import { classNames, getRandomInt } from '../../../utils';

interface UserItemProps {
  id: number;
  name: string;
  isOnline: boolean;
}

export const UserItem: React.FC<UserItemProps> = ({ id, name, isOnline }) => {
  const count = getRandomInt(0, 5);
  const navigate = useStore((state) => state.navigate);
  const navigationPath = useStore((state) => state.navigation);
  const isSelected =
    navigationPath.id === id && navigationPath.path === '/user/:id';

  const handleClick = () => {
    navigate('/user/:id', id);
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
          <img
            className="h-8 w-8 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white">
            {isOnline ? (
              <span className="block h-2 w-2 rounded-full bg-green-400" />
            ) : (
              <span className="block h-2 w-2 rounded-full bg-gray-400" />
            )}
          </span>
        </span>
      </div>

      <span className="truncate">{name}</span>

      {count ? (
        <span
          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
          aria-hidden="true"
        >
          {count}+
        </span>
      ) : null}
    </a>
  );
};
