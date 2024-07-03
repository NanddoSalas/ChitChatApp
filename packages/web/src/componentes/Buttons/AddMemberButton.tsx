import { PlusIcon } from '@heroicons/react/20/solid';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { AddMemberForm } from '../../types/api/members';
import { Member } from '../../types/api/resources';
import { classNames } from '../../utils';

interface AddMemberButtonProps {
  roomId: number;
  userId: number;
}

export const AddMemberButton: React.FC<AddMemberButtonProps> = ({
  roomId,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAuthMutation<Member, null, AddMemberForm>({
    mutationKey: [`/rooms/${roomId}/members`],
    onSuccess: (newMember) => {
      queryClient.setQueryData<Member[]>(
        [`/rooms/${roomId}/members`],
        (oldData) => [...(oldData || []), newMember],
      );
    },
  });

  const handleAddMember = () => {
    mutate({ userId });
  };

  return (
    <button
      className={classNames(
        'btn btn-circle btn-neutral',
        isPending ? 'btn-disabled' : '',
      )}
      onClick={handleAddMember}
    >
      {isPending ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};
