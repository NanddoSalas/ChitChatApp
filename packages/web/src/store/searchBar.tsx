import { StateCreator } from 'zustand';

interface Store {
  searchBar: {
    isOpen: boolean;
  };
}

interface Actions {
  openSearchBar: () => void;
  closeSearchBar: () => void;
}

export interface SearchBarSlice extends Store, Actions {}

export const createSearchBarSlice: StateCreator<SearchBarSlice> = (set) => ({
  searchBar: {
    isOpen: false,
  },
  openSearchBar: () => set(() => ({ searchBar: { isOpen: true } })),
  closeSearchBar: () => set(() => ({ searchBar: { isOpen: false } })),
});
