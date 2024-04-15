import { useStore } from '../store';

export default function InvitationsTable() {
  const invitations = useStore((state) => state.invitations.data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRevokeInvitation = (invitationId: number) => {};

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
                Invite Code
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Limit
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
              >
                Uses
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
                Is Revoked
              </th>

              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {invitations?.map((invitation) => {
              return (
                <tr key={invitation.id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                    <div className="mt-1 text-gray-500">
                      {invitation.inviteCode}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">{invitation.limit}</div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                    <div className="mt-1 text-gray-500">{invitation.uses}</div>
                  </td>

                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell ">
                    <div className="mt-1 text-gray-500">
                      {invitation.createdAt.toDateString()}
                    </div>
                  </td>

                  <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium">
                    <button
                      type="button"
                      className="rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      onClick={() => handleRevokeInvitation(invitation.id)}
                    >
                      Revoke
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
