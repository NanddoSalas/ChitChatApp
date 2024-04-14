import { StateCreator } from 'zustand';

interface Store {
  commandPalette: {
    isOpen: boolean;
  };
}

interface Actions {
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
}

export interface CommandPaletteSlice extends Store, Actions {}

export const createCommandPaletteSlice: StateCreator<CommandPaletteSlice> = (
  set,
) => ({
  commandPalette: {
    isOpen: false,
  },
  openCommandPalette: () => set(() => ({ commandPalette: { isOpen: true } })),
  closeCommandPalette: () => set(() => ({ commandPalette: { isOpen: false } })),
});
