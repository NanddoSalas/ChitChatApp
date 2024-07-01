import { useQueryClient } from '@tanstack/react-query';
import { RevokeInvitationDialog } from '../../dialogs';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { useStore } from '../../store';
import { Invitation } from '../../types/api/resources';
import { classNames } from '../../utils';

interface RevokeINvitationButtonProps {
  invitationId: number;
}

export const RevokeInvitationButton: React.FC<RevokeINvitationButtonProps> = ({
  invitationId,
}) => {
  const queryClient = useQueryClient();
  const openDialog = useStore((state) => state.openConfirmationDialog);
  const { mutate, isPending } = useAuthMutation<null, null, null>(
    {
      mutationKey: [`/invitations/${invitationId}`],
      onSuccess: () => {
        queryClient.setQueryData<Invitation[]>(['/invitations'], (oldData) => {
          if (oldData) {
            return [
              ...oldData.map((invitation) =>
                invitation.id === invitationId
                  ? { ...invitation, revoked: true }
                  : invitation,
              ),
            ];
          }
        });
      },
    },
    'delete',
  );

  const handleRevokeInvitation = () => {
    openDialog(RevokeInvitationDialog, () => mutate(null));
  };

  return (
    <button
      className={classNames(
        'btn btn-neutral btn-outline btn-sm lg:btn-md',
        isPending ? 'btn-disabled' : '',
      )}
      onClick={handleRevokeInvitation}
    >
      {isPending ? <span className="loading loading-spinner"></span> : 'Revoke'}
    </button>
  );
};
