import { useStore } from '../../store';
import { Skeleton } from '../Skeleton';
import { RoomItem, SearchButton } from './components';
import { AdminOptions } from './components/AdminOptions';
import { ProfileButton } from './components/ProfileButton';
import { UserItem } from './components/UserItem';

export const Sidebar = () => {
  const role = useStore((state) => state.auth.user?.role);
  const users = useStore((state) => state.users);
  const rooms = useStore((state) => state.rooms);

  const fetching = users.fetching && rooms.fetching;

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="hidden lg:block">
          <SearchButton />
        </li>

        {role !== 'Member' ? <AdminOptions fetching={fetching} /> : null}

        <li>
          <div className="font-semibold leading-6 text-gray-200">Rooms</div>

          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {fetching ? (
              <>
                <li>
                  <Skeleton square />
                </li>

                <li>
                  <Skeleton square />
                </li>
              </>
            ) : (
              rooms.data?.map(({ id, name, isPrivate, haveAccess }) => (
                <li key={id}>
                  <RoomItem
                    id={id}
                    name={name}
                    isPrivate={isPrivate}
                    haveAccess={haveAccess}
                  />
                </li>
              ))
            )}
          </ul>
        </li>

        <li>
          <div className="font-semibold leading-6 text-gray-200">
            Direct Messages
          </div>

          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {fetching ? (
              <>
                <li>
                  <Skeleton />
                </li>

                <li>
                  <Skeleton />
                </li>

                <li>
                  <Skeleton />
                </li>
              </>
            ) : (
              users.data?.map((user) => (
                <li key={user.id}>
                  <UserItem
                    id={user.id}
                    avatar={user.avatar}
                    fullName={user.fullName}
                  />
                </li>
              ))
            )}
          </ul>
        </li>

        <li className="-mx-6 mt-auto">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
};
