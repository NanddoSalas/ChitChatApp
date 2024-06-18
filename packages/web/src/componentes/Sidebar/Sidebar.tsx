import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { Room, User } from '../../types/api/resources';
import { Skeleton } from '../Skeleton';
import { RoomItem, SearchButton, UserItem } from './components';
import { AdminOptions } from './components/AdminOptions';
import { ProfileButton } from './components/ProfileButton';

export const Sidebar = () => {
  const { user } = useContext(AuthContext);

  const { data: users, isFetching: isFetchingUsers } = useAuthQuery<
    User[],
    Error
  >({ queryKey: ['/users'] });

  const { data: rooms, isFetching: isFetchingRooms } = useAuthQuery<
    Room[],
    Error
  >({ queryKey: ['/rooms'] });

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li className="hidden lg:block">
          <SearchButton />
        </li>

        {user!.role !== 'Member' ? (
          <AdminOptions fetching={isFetchingRooms || isFetchingUsers} />
        ) : null}

        <li>
          <div className="font-semibold leading-6 text-gray-200">Rooms</div>

          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {isFetchingRooms ? (
              <>
                <li>
                  <Skeleton square />
                </li>

                <li>
                  <Skeleton square />
                </li>
              </>
            ) : (
              rooms?.map((room) => (
                <li key={room.id}>
                  <RoomItem
                    id={room.id}
                    name={room.roomName}
                    isPrivate={room.private}
                    haveAccess={room.hasAccess}
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
            {isFetchingUsers ? (
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
              users?.map((user) => (
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
