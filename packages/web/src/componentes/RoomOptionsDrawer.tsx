import {
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import slugify from 'slugify';
import { DeleteRoomDialog, MakeRoomPrivate, MakeRoomPublic } from '../dialogs';
import { useAuthMutation } from '../hooks/useAuthMutation';
import { useStore } from '../store';
import { Room } from '../types/api/resources';
import { UpdateRoomForm } from '../types/api/rooms';
import { Dropdown } from './Dropdown';

interface RoomOptionsDropdownProps {
  roomId: number;
  roomName: string;
  isPrivate: boolean;
}

export const RoomOptionsDropdown: React.FC<RoomOptionsDropdownProps> = ({
  roomId,
  roomName,
  isPrivate,
}) => {
  const queryClient = useQueryClient();
  const openDialog = useStore((state) => state.openConfirmationDialog);
  const navigate = useNavigate();
  const handleManageMembers = () => {
    navigate({
      to: `/room/$roomId/$roomName/members`,
      params: { roomId: roomId.toString(), roomName: slugify(roomName) },
    });
  };

  const updateRoomMutation = useAuthMutation<null, null, UpdateRoomForm>(
    {
      mutationKey: [`/rooms/${roomId}`],
      onSuccess: (_data, variables) => {
        queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
          if (oldData) {
            return oldData.map((room) =>
              room.id === roomId
                ? { ...room, private: variables.private }
                : room,
            );
          }
        });
      },
    },
    'put',
  );

  const delteRoomMutation = useAuthMutation<null, null, null>(
    {
      mutationKey: [`/rooms/${roomId}`],
      onSuccess: () => {
        queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
          if (oldData) {
            return oldData.filter((room) => room.id !== roomId);
          }
        });
      },
    },
    'delete',
  );

  const handleMakePrivate = () => {
    openDialog(MakeRoomPrivate, () => {
      updateRoomMutation.mutate({ private: true, name: roomName });
    });
  };

  const handleMakePublic = () => {
    openDialog(MakeRoomPublic, () => {
      updateRoomMutation.mutate({ private: false, name: roomName });
    });
  };

  const handleDelete = () => {
    openDialog(DeleteRoomDialog, () => {
      delteRoomMutation.mutate(null);
    });
  };

  if (isPrivate) {
    return (
      <Dropdown
        loading={updateRoomMutation.isPending}
        options={[
          {
            name: 'Manage Members',
            icon: (
              <UsersIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            ),
            onClick: handleManageMembers,
          },

          {
            name: 'Make Public',
            icon: (
              <LockOpenIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            ),
            onClick: handleMakePublic,
          },

          {
            name: 'Delete',
            icon: (
              <TrashIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            ),
            onClick: handleDelete,
          },
        ]}
      />
    );
  }

  return (
    <Dropdown
      loading={updateRoomMutation.isPending}
      options={[
        {
          name: 'Make Private',
          icon: (
            <LockClosedIcon
              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          ),
          onClick: handleMakePrivate,
        },

        {
          name: 'Delete',
          icon: (
            <TrashIcon
              className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          ),
          onClick: handleDelete,
        },
      ]}
    />
  );
};
