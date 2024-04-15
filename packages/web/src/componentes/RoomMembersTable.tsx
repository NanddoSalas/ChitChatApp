import { useStore } from '../store';

export default function RoomMembersTable() {
  const roomId = useStore((state) => state.navigation.id!);
  const members = useStore((state) => state.roomMembers[roomId].data);
  const getUser = useStore((state) => state.getUser);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleKickOut = (userId: number) => {};

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
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Email
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Member Since
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Status
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {members?.map((member) => {
              const user = getUser(member.userId)!;

              return (
                <tr key={user.email}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                    <div className="flex items-center">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img
                          className="h-11 w-11 rounded-full"
                          src={user?.avatar}
                          alt=""
                        />
                      </div>

                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="mt-1 text-gray-500 md:hidden">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">{user.email}</div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">
                      {user.joinedServer.toDateString()}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell ">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Online
                    </span>
                  </td>

                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                    <button
                      type="button"
                      className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      onClick={() => handleKickOut(user.id)}
                    >
                      Kick out
                    </button>
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
