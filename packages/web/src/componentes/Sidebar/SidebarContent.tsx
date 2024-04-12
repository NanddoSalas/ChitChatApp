import { useStore } from '../../store';
import { AdminOptions } from './AdminOptions';
import { RoomItem, SearchButton } from './components';
import { ProfileButton } from './components/ProfileButton';
import { UserItem } from './components/UserItem';

export const SidebarContent = () => {
  const users = useStore((state) => state.users.data);
  const rooms = useStore((state) => state.rooms.data);
  const role = useStore((state) => state.auth.user?.role);

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="hidden lg:block">
          <SearchButton />
        </li>

        {role !== 'Member' ? <AdminOptions /> : null}

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
