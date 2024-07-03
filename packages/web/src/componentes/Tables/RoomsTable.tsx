import { useContext } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { AuthContext } from '../../AuthContext';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useGetUser } from '../../hooks/useGetUser';
import { Room } from '../../types/api/resources';
import { RoomOptionsDropdown } from '../RoomOptionsDrawer';

export default function RoomsTable() {
  const { user } = useContext(AuthContext);
  const getUser = useGetUser();

  const { data: rooms } = useAuthQuery<Room[], Error>({
    queryKey: ['/rooms'],
  });

  return (
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
              >
                Name
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Admin
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Created At
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Type
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {rooms?.map((room) => {
              const date = new Date(room.creationDate);

              return (
                <tr key={room.id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                    <div className="font-medium text-gray-900">
                      {room.roomName}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Avatar
                        {...genConfig(getUser(room.creatorId).email)}
                        className="w-12 h-12"
                      />

                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {getUser(room.creatorId)?.fullName}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">
                      {date.toDateString()} {date.toLocaleTimeString()}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">
                      {room.private ? 'Private' : 'Public'}
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                    {user!.id === room.creatorId ? (
                      <RoomOptionsDropdown
                        roomId={room.id}
                        roomName={room.roomName}
                        isPrivate={room.private}
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
