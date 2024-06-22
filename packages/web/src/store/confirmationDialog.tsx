import { StateCreator } from 'zustand';
import { Dialog } from '../types';

interface Store {
  confirmationDialog: {
    dialog: Dialog | null;
    isOpen: boolean;
    callback: () => void;
  };
}

interface Actions {
  openConfirmationDialog: (dialog: Dialog, callback: () => void) => void;
  closeConfirmationDialog: (isConfirmed: boolean) => void;
}

export interface ConfirmationDialogSlice extends Store, Actions {}

export const createConfirmationDialogSlice: StateCreator<
  ConfirmationDialogSlice
> = (set, get) => ({
  confirmationDialog: {
    dialog: null,
    isOpen: false,
    callback: () => undefined,
  },
  openConfirmationDialog: (dialog, callback) =>
    set(() => ({
      confirmationDialog: {
        isOpen: true,
        dialog,
        callback,
      },
    })),
  closeConfirmationDialog: (isConfirmed) => {
    if (isConfirmed) {
      get().confirmationDialog.callback();
    }

    set(({ confirmationDialog }) => ({
      confirmationDialog: {
        dialog: confirmationDialog.dialog,
        isOpen: false,
        callback: confirmationDialog.callback,
      },
    }));
  },
});
