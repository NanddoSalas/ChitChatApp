import {
  EnvelopeIcon,
  HashtagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useStore } from '../../store';
import { NavigationPath } from '../../store/types';
import { RoomItem, SearchButton } from './components';
import { NavigationItem } from './components/NavigationItem';
import { ProfileButton } from './components/ProfileButton';
import { UserItem } from './components/UserItem';

const navigation = [
  {
    name: 'Invitations',
    icon: EnvelopeIcon,
    current: false,
    href: '/invitations',
  },
  { name: 'Users', icon: UserIcon, current: false, href: '/users' },
  { name: 'Rooms', icon: HashtagIcon, current: false, href: '/rooms' },
];

export const SidebarContent = () => {
  const users = useStore((state) => state.users.data);
  const rooms = useStore((state) => state.rooms.data);

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="hidden lg:block">
          <SearchButton />
        </li>

        <li>
          <div className="font-semibold leading-6 text-gray-400">
            Admin Options
          </div>

          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavigationItem
                  name={item.name}
                  icon={item.icon}
                  href={item.href as NavigationPath}
                />
              </li>
            ))}
          </ul>
        </li>

        <li>
          <div className=" font-semibold leading-6 text-gray-400">Rooms</div>

          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {rooms?.map(({ id, name, isPrivate, haveAccess }) => (
              <li key={id}>
                <RoomItem
                  id={id}
                  name={name}
                  isPrivate={isPrivate}
                  haveAccess={haveAccess}
                />
              </li>
            ))}
          </ul>
        </li>

        <li>
          <div className="font-semibold leading-6 text-gray-400">
            Direct Messages
          </div>

          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {users?.map((user) => (
              <li key={user.id}>
                <UserItem
                  id={user.id}
                  avatar={user.avatar}
                  fullName={user.fullName}
                />
              </li>
            ))}
          </ul>
        </li>

        <li className="-mx-6 mt-auto hidden lg:block">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
};
