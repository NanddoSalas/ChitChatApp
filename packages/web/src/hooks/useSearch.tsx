import Fuse from 'fuse.js';
import { useState } from 'react';
import { useStore } from '../store';
import { Room, User } from '../types/resources';

type Option = {
  id: number;
  name: string;
  path: string;
};

const adminOptions: Option[] = [
  { id: 1, name: 'Invitations', path: '/invitations' },
  { id: 2, name: 'Users', path: '/users' },
  { id: 3, name: 'Rooms', path: '/rooms' },
];

const options: Option[] = [
  { id: 4, name: 'Home', path: '/' },
  { id: 5, name: 'Account', path: '/account' },
];

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const users = useStore((state) => state.users.data) || [];
  const rooms = useStore((state) => state.rooms.data) || [];
  const role = useStore((state) => state.auth.user?.role) || 'Member';

  const fuseUsers = new Fuse<User>(users, { keys: ['fullName'] });
  const fuseRooms = new Fuse<Room>(rooms, { keys: ['name'] });
  const fuseOptions = new Fuse<Option>(
    options.concat(role !== 'Member' ? adminOptions : []),
    { keys: ['name'] },
  );

  const filteredUsers = fuseUsers.search(query).map(({ item }) => item);
  const filteredRooms = fuseRooms.search(query).map(({ item }) => item);
  const filteredOptions = fuseOptions.search(query).map(({ item }) => item);

  return { query, setQuery, filteredRooms, filteredUsers, filteredOptions };
};
