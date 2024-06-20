import {
  HashtagIcon,
  LockClosedIcon,
  LockOpenIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from '@tanstack/react-router';
import slugify from 'slugify';
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
  const navigate = useNavigate();
  const isSelected = useLocation().pathname === `/room/${id}/${slugify(name)}`;

  const haveAccess =
    isPrivate === false ? true : props.haveAccess ? true : false;

  const handleClick = () => {
    if (haveAccess && !isSelected) {
      navigate({
        to: '/room/$roomId/$roomName',
        params: {
          roomId: id.toString(),
          roomName: slugify(name),
        },
      });
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

      {/* {haveAccess ? (
        roomMessages?.unreadMessagesCount ? (
          <span
            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
            aria-hidden="true"
          >
            {roomMessages?.unreadMessagesCount}+
          </span>
        ) : null
      ) : null} */}
    </NavItemContainer>
  );
};
