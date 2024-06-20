import { create } from 'zustand';
import { SearchBarSlice, createSearchBarSlice } from './searchBar';

export const useStore = create<SearchBarSlice>()((...a) => ({
  ...createSearchBarSlice(...a),
}));
