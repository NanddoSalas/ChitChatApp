import { StateCreator } from 'zustand';
import { User } from '../types/resources';

interface Store {
  users: {
    data: User[] | null;
    fetching: boolean;
  };
}

interface Actions {
  retrieveUsers: () => void;
  getUser: (userId: number) => User | null;
}

export interface UsersSlice extends Store, Actions {}

export const createUsersSlice: StateCreator<UsersSlice> = (set, get) => ({
  users: { data: null, fetching: false },
  retrieveUsers: () => {},
  getUser: (userId) => {
    return get().users.data?.find(({ id }) => id === userId) || null;
  },
});
