import { CheckIcon } from '@heroicons/react/20/solid';
import { useParams } from '@tanstack/react-router';
import { useEffect } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useSearchUsers } from '../../hooks/useSearchUsers';
import { Member } from '../../types/api/resources';
import { classNames } from '../../utils';
import { AddMemberButton } from '../Buttons/AddMemberButton';
import { Modal } from './Modal';

interface GenerateInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<GenerateInvitationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { filteredUsers, query, setQuery } = useSearchUsers();

  const { roomId } = useParams({
    from: '/_dashboard/room/$roomId/$roomName/members',
  });

  const { data: members } = useAuthQuery<Member[], Error>({
    queryKey: [`/rooms/${roomId}/members`],
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen, setQuery]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="prose">
        <h2 className="text-center sm:text-start">Add Member</h2>

        <input
          type="text"
          placeholder="Search user"
          className={classNames('input input-bordered w-full')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="mt-6 flex flex-col space-y-6">
          {filteredUsers.map((user) => {
            const member = members?.find(({ userId }) => userId === user.id);

            return (
              <div className="flex items-center">
                <Avatar {...genConfig(user?.email)} className="w-12 h-12" />

                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {user.fullName}
                  </div>
                </div>

                <div className="ml-auto">
                  {member ? (
                    <div className={'btn btn-circle btn-disabled'}>
                      <CheckIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  ) : (
                    <AddMemberButton
                      roomId={parseInt(roomId)}
                      userId={user.id}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
