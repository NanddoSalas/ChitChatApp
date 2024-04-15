import { useStore } from '../store';
import RoomOptions from './RoomOptions';

export default function RoomsTable() {
  const rooms = useStore((state) => state.rooms.data);
  const getUser = useStore((state) => state.getUser);

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
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 "
              >
                Admin
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Created At
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Type
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {rooms?.map((room) => (
              <tr key={room.name}>
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div className="font-medium text-gray-900">Room Name</div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                      <img
                        className="h-11 w-11 rounded-full"
                        src={getUser(room.adminId)?.avatar}
                        alt=""
                      />
                    </div>

                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {getUser(room.adminId)?.fullName}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="mt-1 text-gray-500">
                    {room.createdAt.toDateString()}
                  </div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="mt-1 text-gray-500">Public</div>
                </td>

                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                  <RoomOptions />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
