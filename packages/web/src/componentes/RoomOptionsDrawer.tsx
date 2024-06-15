import {
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { Dropdown } from './Dropdown';

interface RoomOptionsDropdownProps {
  roomId: number;
  isPrivate: boolean;
}

export const RoomOptionsDropdown: React.FC<RoomOptionsDropdownProps> = ({
  roomId,
  isPrivate,
}) => {
  const navigate = useNavigate();

  const handleManageMembers = () => {
    navigate({ to: `/rooms/${roomId}/members` });
  };

  const handleMakePrivate = () => {};
  const handleMakePublic = () => {};
  const handleDelete = () => {};

  if (isPrivate) {
    return (
      <Dropdown
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
