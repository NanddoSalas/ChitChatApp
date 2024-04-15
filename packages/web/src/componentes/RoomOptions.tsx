import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import { useStore } from '../store';
import { classNames } from '../utils';

interface RoomOptionsProps {
  roomId: number;
  isPrivate: boolean;
}

const Item: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href="#"
          className={classNames(
            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
            'group flex items-center px-4 py-2 text-sm',
          )}
          onClick={onClick}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
};

export const RoomOptions: React.FC<RoomOptionsProps> = ({
  isPrivate,
  roomId,
}) => {
  const navigate = useStore((state) => state.navigate);

  const handleManageMembers = () => navigate('/rooms/:id/members', roomId);

  const handleMakePrivate = () => {};
  const handleMakePublic = () => {};
  const handleDelete = () => {};

  return (
    <Menu as="div" className="inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {isPrivate && (
              <Item onClick={handleManageMembers}>
                <TrashIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Manage Members
              </Item>
            )}

            {isPrivate ? (
              <Item onClick={handleMakePublic}>
                <TrashIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Make Public
              </Item>
            ) : (
              <Item onClick={handleMakePrivate}>
                <TrashIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Make Private
              </Item>
            )}

            <Item onClick={handleDelete}>
              <TrashIcon
                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Delete
            </Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
