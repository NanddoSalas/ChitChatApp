import { useLocation, useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import { classNames } from '../../../utils';
import { Avatar } from '../../Avatar';

export const ProfileButton = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const current = useLocation().pathname === '/account';

  const handleClick = () => {
    if (!current) {
      navigate({ to: '/account' });
    }
  };

  return (
    <a
      className={classNames(
        'flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800',
        current ? 'bg-gray-800' : '',
      )}
      onClick={handleClick}
    >
      <Avatar avatar={user!.avatar} />

      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">{user!.fullName}</span>
    </a>
  );
};
