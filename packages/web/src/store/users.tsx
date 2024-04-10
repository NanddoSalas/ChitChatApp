import { StateCreator } from 'zustand';
import { User } from './types';

interface Store {
  users: {
    data: User[] | null;
    fetching: boolean;
  };
}

interface Actions {
  retrieveUsers: () => void;
}

export interface UsersSlice extends Store, Actions {}

export const createUsersSlice: StateCreator<UsersSlice> = () => ({
  users: { data: null, fetching: false },
  retrieveUsers: () => {},
});
