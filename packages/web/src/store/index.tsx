import { create } from 'zustand';
import {
  ConfirmationDialogSlice,
  createConfirmationDialogSlice,
} from './confirmationDialog';
import { SearchBarSlice, createSearchBarSlice } from './searchBar';
import { SidebarSlice, createSidebarSlice } from './sidebar';

export const useStore = create<
  SearchBarSlice & ConfirmationDialogSlice & SidebarSlice
>()((...a) => ({
  ...createSearchBarSlice(...a),
  ...createConfirmationDialogSlice(...a),
  ...createSidebarSlice(...a),
}));
