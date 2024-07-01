import { useQueryClient } from '@tanstack/react-query';
import { RevokeAdminDialog } from '../../dialogs';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { useStore } from '../../store';
import { User } from '../../types/api/resources';
import { UpdateRoleForm } from '../../types/api/users';
import { classNames } from '../../utils';

interface RevokeAdminButtonProps {
  userId: number;
}

export const RevokeAdminButton: React.FC<RevokeAdminButtonProps> = ({
  userId,
}) => {
  const openDialog = useStore((state) => state.openConfirmationDialog);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useAuthMutation<null, null, UpdateRoleForm>(
    {
      mutationKey: [`/users/${userId}/role`],
      onSuccess: () => {
        queryClient.setQueryData<User[]>(['/users'], (oldData) => {
          if (oldData) {
            return [
              ...oldData.map((user) =>
                user.id === userId ? { ...user, role: 'Member' } : user,
              ),
            ];
          }
        });
      },
    },
    'put',
  );

  const handleRevokeAdmin = () => {
    openDialog(RevokeAdminDialog, () => {
      console.log('revoke admin ' + userId);
      mutate({ role: 'Member' });
    });
  };

  return (
    <button
      className={classNames(
        'btn btn-neutral btn-outline btn-sm lg:btn-md',
        isPending ? 'btn-disabled' : '',
      )}
      onClick={handleRevokeAdmin}
    >
      {isPending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        'Revoke Admin'
      )}
    </button>
  );
};
