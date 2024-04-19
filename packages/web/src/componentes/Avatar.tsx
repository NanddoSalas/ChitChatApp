import { classNames } from '../utils';

interface AvatarProps {
  avatar: string;
  isOnline?: boolean;
  size?: 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({
  avatar,
  isOnline,
  size = 'md',
}) => (
  <div
    className={classNames(
      'avatar',
      isOnline ? 'online' : '',
      isOnline === false ? 'offline' : '',
      avatar ? '' : 'placeholder',
    )}
  >
    <div className={classNames('rounded-full', size === 'md' ? 'w-8' : 'w-12')}>
      {avatar ? (
        <img src={avatar} />
      ) : (
        <span
          className={classNames(
            'inline-block overflow-hidden rounded-full bg-gray-100',
            size === 'md' ? 'w-8 h-8' : 'w-12 h-12',
          )}
        >
          <svg
            className="h-full w-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      )}
    </div>
  </div>
);
