import {
  EnvelopeIcon,
  HashtagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { NavigationPath } from '../../store/types';
import { SearchButton } from './components';
import { NavigationItem } from './components/NavigationItem';
import { ProfileButton } from './components/ProfileButton';
import { RoomItem } from './components/RoomItem';
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

const rooms = [
  { id: 1, name: 'Heroicons', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', initial: 'T', current: true },
  { id: 3, name: 'Workcation', initial: 'W', current: false },
];

const users = [
  { id: 1, name: 'Luis Fernando Cano Salas', initial: 'L', current: true },
  { id: 2, name: 'Linus', initial: 'L', current: false },
  { id: 3, name: 'Sean Frankil', initial: 'S', current: false },
  {
    id: 4,
    name: 'This is a Fucking long namedsjfkldsjflksdjfk',
    initial: 'A',
    current: false,
  },
];

export const SidebarContent = () => {
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
            {rooms.map(({ id, name, current }) => (
              <li key={id}>
                <RoomItem
                  id={id}
                  name={name}
                  isPrivate={current}
                  haveAccess={current}
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
            {users.map(({ id, name, current }) => (
              <li key={id}>
                <UserItem id={id} name={name} isOnline={current} />
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
