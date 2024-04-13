import {
  HashtagIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '../../../store';
import { classNames, getRandomInt } from '../../../utils';

interface RoomItemProps {
  id: number;
  name: string;
  isPrivate: boolean;
  haveAccess: boolean;
}

export const RoomItem: React.FC<RoomItemProps> = ({
  id,
  name,
  isPrivate,
  ...props
}) => {
  const count = getRandomInt(0, 5);
  const navigate = useStore((state) => state.navigate);
  const navigationPath = useStore((state) => state.navigation);
  const isSelected =
    navigationPath.id === id && navigationPath.path === '/rooms/:id';

  const haveAccess =
    isPrivate === false ? true : props.haveAccess ? true : false;

  const handleClick = () => {
    if (haveAccess) {
      navigate('/rooms/:id', id);
    }
  };

  return (
    <a
      className={classNames(
        isSelected ? 'bg-gray-800 text-white' : 'text-gray-400',
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
        haveAccess ? 'hover:bg-gray-800 hover:text-white' : '',
      )}
      onClick={handleClick}
    >
      {isPrivate ? (
        haveAccess ? (
          <LockOpenIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        ) : (
          <LockClosedIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        )
      ) : (
        <HashtagIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
      )}

      {name}

      {haveAccess ? (
        count ? (
          <span
            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
            aria-hidden="true"
          >
            {count}+
          </span>
        ) : null
      ) : null}
    </a>
  );
};
