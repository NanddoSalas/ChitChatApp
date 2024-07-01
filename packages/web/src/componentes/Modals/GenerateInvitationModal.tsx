import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { GenerateInvitationForm } from '../../types/api/invitations';
import { Invitation } from '../../types/api/resources';
import { classNames } from '../../utils';
import { Modal } from './Modal';

interface GenerateInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GenerateInvitationModal: React.FC<
  GenerateInvitationModalProps
> = ({ isOpen, onClose }) => {
  const [limit, setLimit] = useState<number>(-1);
  const queryClient = useQueryClient();
  const { isPending, isSuccess, mutate, reset, data } = useAuthMutation<
    Invitation,
    Error,
    GenerateInvitationForm
  >({
    mutationKey: ['/invitations'],
    onSuccess: (newInvitation) => {
      queryClient.setQueryData<Invitation[]>(['/invitations'], (oldData) => {
        if (oldData) {
          return [...oldData, newInvitation];
        }
      });
    },
  });

  const handleGenerateInviteCode = () => mutate({ limit });

  useEffect(() => {
    if (isOpen) {
      reset();
      setLimit(-1);
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="prose">
        <h2 className="text-center sm:text-start">Generate Invite Code</h2>

        <div className="flex justify-between flex-col sm:flex-row gap-6">
          {isSuccess ? (
            <div className="flex gap-6">
              <input
                type="text"
                className="input input-bordered focus:outline-none max-w-48"
                value={data.inviteCode}
                readOnly
              />

              <div className="tooltip" data-tip="Copy">
                <button
                  className="btn btn-circle btn-outline"
                  onClick={() => {
                    navigator.clipboard.writeText(data.inviteCode);
                  }}
                >
                  <DocumentDuplicateIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ) : (
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue={-1}
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option disabled value={-1}>
                Set Limit
              </option>
              <option value={0}>No Limit</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          )}

          {isSuccess ? (
            <button className={'btn btn-neutral'} onClick={onClose}>
              Close
            </button>
          ) : (
            <button
              className={classNames(
                'btn btn-neutral',
                isPending ? 'btn-disabled' : '',
                limit === -1 ? 'btn-disabled' : '',
              )}
              onClick={handleGenerateInviteCode}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Generate'
              )}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
