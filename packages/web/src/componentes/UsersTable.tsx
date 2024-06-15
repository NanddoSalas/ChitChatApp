import { useAuthQuery } from '../hooks/useAuthQuery';
import { User } from '../types/api/resources';
import { Avatar } from './Avatar';

export const UsersTable = () => {
  const { data: usersData } = useAuthQuery<User[], Error>({
    queryKey: ['/users'],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleMakeAdmin = (userId: number) => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRevokeAdmin = (userId: number) => {};

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
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden xl:table-cell"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Role
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Update Role</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {usersData?.map((user) => (
              <tr key={user.email}>
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div className="flex items-center">
                    <div className="h-11 w-11 flex-shrink-0">
                      <Avatar avatar={user.avatar} size="lg" />
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
                  <div className="mt-1 text-gray-500">{user.creationDate}</div>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden xl:table-cell ">
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Online
                  </span>
                </td>

                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  {user.role}
                </td>

                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right">
                  {user.role === 'Admin' && (
                    <button
                      className="btn btn-neutral btn-outline btn-sm lg:btn-md"
                      onClick={() => handleRevokeAdmin(user.id)}
                    >
                      Revoke Admin
                    </button>
                  )}

                  {user.role === 'Member' && (
                    <button
                      className="btn btn-neutral btn-outline btn-sm lg:btn-md"
                      onClick={() => handleMakeAdmin(user.id)}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
