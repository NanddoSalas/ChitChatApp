import {
  HashtagIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '../../../store';
import { NavItemContainer } from './NavItemContainer';

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
  const navigate = useStore((state) => state.navigate);
  const navigationPath = useStore((state) => state.navigation);
  const isSelected =
    navigationPath.id === id && navigationPath.path === '/rooms/:id';
  const roomMessages = useStore((state) => state.roomMessages[id]);

  const haveAccess =
    isPrivate === false ? true : props.haveAccess ? true : false;

  const handleClick = () => {
    if (haveAccess) {
      navigate('/rooms/:id', id);
    }
  };

  return (
    <NavItemContainer onClick={handleClick} selected={isSelected}>
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
        roomMessages?.unreadMessagesCount ? (
          <span
            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
            aria-hidden="true"
          >
            {roomMessages?.unreadMessagesCount}+
          </span>
        ) : null
      ) : null}
    </NavItemContainer>
  );
};
