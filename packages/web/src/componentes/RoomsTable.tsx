import { useAuthQuery } from '../hooks/useAuthQuery';
import { Room } from '../types/api/resources';
import { Avatar } from './Avatar';
import { RoomOptionsDropdown } from './RoomOptionsDrawer';

export default function RoomsTable() {
  // const rooms = useStore((state) => state.rooms.data);
  // const getUser = useStore((state) => state.getUser);

  const { data: roomsData } = useAuthQuery<Room[], Error>({
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
            {roomsData?.map((room) => (
              <tr key={room.id}>
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div className="font-medium text-gray-900">
                    {room.roomName}
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Avatar
                      // avatar={getUser(room.creatorId)?.avatar || ''}
                      avatar={''}
                      size="lg"
                    />

                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {/* {getUser(room.creatorId)?.fullName} */}
                        creator name
                      </div>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                  <div className="mt-1 text-gray-500">{room.creationDate}</div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                  <div className="mt-1 text-gray-500">
                    {room.private ? 'Private' : 'Public'}
                  </div>
                </td>

                <td className="whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                  <RoomOptionsDropdown
                    roomId={room.id}
                    isPrivate={room.private}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
