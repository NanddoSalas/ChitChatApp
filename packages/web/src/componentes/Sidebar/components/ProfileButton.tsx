import { useStore } from '../../../store';
import { classNames } from '../../../utils';

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
      {avatar ? (
        <img
          className="h-8 w-8 rounded-full bg-gray-800"
          src={avatar || ''}
          alt=""
        />
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

      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">{fullName}</span>
    </a>
  );
};
