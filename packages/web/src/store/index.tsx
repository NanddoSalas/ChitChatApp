import { create } from 'zustand';
import {
  ConfirmationDialogSlice,
  createConfirmationDialogSlice,
} from './confirmationDialog';
import { SearchBarSlice, createSearchBarSlice } from './searchBar';

export const useStore = create<SearchBarSlice & ConfirmationDialogSlice>()(
  (...a) => ({
    ...createSearchBarSlice(...a),
    ...createConfirmationDialogSlice(...a),
  }),
);
