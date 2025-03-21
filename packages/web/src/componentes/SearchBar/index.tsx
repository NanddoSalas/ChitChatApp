import { Combobox, Dialog, Transition } from '@headlessui/react';
import { useNavigate } from '@tanstack/react-router';
import { Fragment } from 'react';
import slugify from 'slugify';
import { useSearch } from '../../hooks/useSearch';
import { useStore } from '../../store';
import { classNames } from '../../utils';
import { EmptyQuery } from './EmptyQuery';

export const SearchBar = () => {
  const navigate = useNavigate();
  const { query, setQuery, filteredUsers, filteredRooms, filteredOptions } =
    useSearch();
  const {
    closeSearchBar,
    searchBar: { isOpen },
  } = useStore((state) => state);

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    closeSearchBar();
  };

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-50" onClose={closeSearchBar}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={handleNavigation}>
                <Combobox.Input
                  className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
                  placeholder="Navigate..."
                  onChange={(event) => setQuery(event.target.value)}
                />

                {filteredOptions.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                      Options
                    </h2>

                    {filteredOptions.map(({ id, name, path }) => (
                      <Combobox.Option
                        key={id}
                        value={path}
                        className={({ active }) =>
                          classNames(
                            'cursor-default select-none rounded-md px-4 py-2',
                            active ? 'bg-indigo-600 text-white' : '',
                          )
                        }
                      >
                        {name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {filteredRooms.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                      Rooms
                    </h2>

                    {filteredRooms.map(
                      ({ id, roomName, hasAccess, ...room }) => {
                        if (room.private && !hasAccess) {
                          return null;
                        }

                        return (
                          <Combobox.Option
                            key={id}
                            value={`/room/${id}/${slugify(roomName)}`}
                            className={({ active }) =>
                              classNames(
                                'cursor-default select-none rounded-md px-4 py-2',
                                active ? 'bg-indigo-600 text-white' : '',
                              )
                            }
                          >
                            {roomName}
                          </Combobox.Option>
                        );
                      },
                    )}
                  </Combobox.Options>
                )}

                {filteredUsers.length > 0 && (
                  <Combobox.Options
                    static
                    className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    <h2 className="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900">
                      Users
                    </h2>

                    {filteredUsers.map(({ id, fullName }) => (
                      <Combobox.Option
                        key={id}
                        value={`/user/${id}/${slugify(fullName)}`}
                        className={({ active }) =>
                          classNames(
                            'cursor-default select-none rounded-md px-4 py-2',
                            active ? 'bg-indigo-600 text-white' : '',
                          )
                        }
                      >
                        {fullName}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== '' &&
                  filteredUsers.length === 0 &&
                  filteredRooms.length === 0 &&
                  filteredOptions.length === 0 && <EmptyQuery />}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
