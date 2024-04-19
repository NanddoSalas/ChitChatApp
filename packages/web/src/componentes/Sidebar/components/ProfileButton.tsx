import { useStore } from '../../../store';
import { classNames } from '../../../utils';
import { Avatar } from '../../Avatar';

export const ProfileButton = () => {
  const navigate = useStore((state) => state.navigate);
  const current = useStore((state) => state.navigation.path) === '/account';
  const { fullName, avatar } = useStore((state) => state.auth.user!);

  const handleClick = () => {
    navigate('/account', null);
  };

  return (
    <a
      href="#"
      className={classNames(
        'flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800',
        current ? 'bg-gray-800' : '',
      )}
      onClick={handleClick}
    >
      <Avatar avatar={avatar} />

      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">{fullName}</span>
    </a>
  );
};
