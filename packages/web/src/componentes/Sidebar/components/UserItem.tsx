import { useLocation, useNavigate } from '@tanstack/react-router';
import Avatar, { genConfig } from 'react-nice-avatar';
import slugify from 'slugify';
import { NavItemContainer } from './NavItemContainer';

interface UserItemProps {
  id: number;
  email: string;
  fullName: string;
}

export const UserItem: React.FC<UserItemProps> = ({ id, email, fullName }) => {
  const isSelected =
    useLocation().pathname === `/user/${id}/${slugify(fullName)}`;
  const navigate = useNavigate();

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
      <Avatar {...genConfig(email)} className="w-10 h-10" />

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
