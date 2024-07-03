import Fuse from 'fuse.js';
import { useState } from 'react';
import { User } from '../types/api/resources';
import { useAuthQuery } from './useAuthQuery';

export const useSearchUsers = () => {
  const [query, setQuery] = useState('');

  const { data: users } = useAuthQuery<User[], Error>({ queryKey: ['/users'] });

  const fuseUsers = new Fuse<User>(users || [], { keys: ['fullName'] });

  const filteredUsers = fuseUsers
    .search(query, { limit: 5 })
    .map(({ item }) => item);

  return { query, setQuery, filteredUsers };
};
