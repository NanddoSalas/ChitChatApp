import { useLocation, useNavigate } from '@tanstack/react-router';
import slugify from 'slugify';
import { Avatar } from '../../Avatar';
import { NavItemContainer } from './NavItemContainer';

interface UserItemProps {
  id: number;
  avatar: string;
  fullName: string;
}

export const UserItem: React.FC<UserItemProps> = ({ id, avatar, fullName }) => {
  const isSelected =
    useLocation().pathname === `/user/${id}/${slugify(fullName)}`;
  const navigate = useNavigate();

  const isOnline = isSelected;

  const handleClick = () => {
    if (!isSelected) {
      navigate({
        to: '/user/$userId/$userName',
        params: { userId: id.toString(), userName: slugify(fullName) },
      });
    }
  };

  return (
    <NavItemContainer onClick={handleClick} selected={isSelected}>
      <Avatar avatar={avatar} isOnline={isOnline} />

      <span className="truncate">{fullName}</span>

      {/* {directMessages?.unreadMessagesCount ? (
        <span
          className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
          aria-hidden="true"
        >
          {directMessages?.unreadMessagesCount}+
        </span>
      ) : null} */}
    </NavItemContainer>
  );
};
