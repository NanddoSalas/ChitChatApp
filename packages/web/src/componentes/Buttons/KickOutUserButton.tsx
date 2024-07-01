import { useQueryClient } from '@tanstack/react-query';
import { KickOutUserdialog } from '../../dialogs';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { useStore } from '../../store';
import { Member } from '../../types/api/resources';
import { classNames } from '../../utils';

interface KickOutUserButtonProps {
  userId: number;
  roomId: number;
}

export const KickOutUserButton: React.FC<KickOutUserButtonProps> = ({
  roomId,
  userId,
}) => {
  const openDialog = useStore((state) => state.openConfirmationDialog);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useAuthMutation<null, null, null>(
    {
      mutationKey: [`/rooms/${roomId}/members/${userId}`],
      onSuccess: () => {
        queryClient.setQueryData<Member[]>(
          [`/rooms/${roomId}/members`],
          (oldData) => {
            if (oldData) {
              return oldData.filter((member) => member.userId !== userId);
            }
          },
        );
      },
    },
    'delete',
  );

  const handleKickOut = () => {
    openDialog(KickOutUserdialog, () => {
      mutate(null);
    });
  };

  return (
    <button
      className={classNames(
        'btn btn-neutral btn-outline btn-sm lg:btn-md',
        isPending ? 'btn-disabled' : '',
      )}
      onClick={handleKickOut}
    >
      {isPending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        'Kick Out'
      )}
    </button>
  );
};
