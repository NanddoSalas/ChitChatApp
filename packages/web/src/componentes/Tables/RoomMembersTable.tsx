import { useParams } from '@tanstack/react-router';
import { useContext } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { AuthContext } from '../../AuthContext';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useGetUser } from '../../hooks/useGetUser';
import { Member } from '../../types/api/resources';
import { KickOutUserButton } from '../Buttons/KickOutUserButton';

export default function RoomMembersTable() {
  const { user: me } = useContext(AuthContext);
  const { roomId } = useParams({
    from: '/_dashboard/room/$roomId/$roomName/members',
  });
  const getUser = useGetUser();

  const { data: members } = useAuthQuery<Member[], Error>({
    queryKey: [`/rooms/${roomId}/members`],
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

              {/* <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Status
              </th> */}

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {members?.map((member) => {
              const user = getUser(member.userId)!;
              const date = new Date(member.memberSince);

              return (
                <tr key={user.id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                    <div className="flex items-center">
                      <Avatar
                        {...genConfig(user?.email)}
                        className="w-12 h-12"
                      />

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
                      {date.toDateString()} {date.toLocaleTimeString()}
                    </div>
                  </td>

                  {/* <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell ">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Online
                    </span>
                  </td> */}

                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right">
                    {user.id !== me?.id ? (
                      <KickOutUserButton
                        roomId={parseInt(roomId)}
                        userId={user.id}
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
