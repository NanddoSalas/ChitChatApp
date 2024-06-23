import { useQueryClient } from '@tanstack/react-query';
import { MakeAdminDialog } from '../dialogs';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { useStore } from '../store';
import { User } from '../types/api/resources';
import { UpdateRoleForm } from '../types/api/users';
import { classNames } from '../utils';

interface MakeAdminButtonProps {
  userId: number;
}

export const MakeAdminButton: React.FC<MakeAdminButtonProps> = ({ userId }) => {
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
                user.id === userId ? { ...user, role: 'Admin' } : user,
              ),
            ];
          }
        });
      },
    },
    'put',
  );

  const handleMakeAdmin = () => {
    openDialog(MakeAdminDialog, () => {
      mutate({ role: 'Admin' });
    });
  };

  return (
    <button
      className={classNames(
        'btn btn-neutral btn-outline btn-sm lg:btn-md',
        isPending ? 'btn-disabled' : '',
      )}
      onClick={handleMakeAdmin}
    >
      {isPending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        'Make Admin'
      )}
    </button>
  );
};
