import { StateCreator } from 'zustand';

interface Store {
  sidebar: {
    scrollOffset: number;
  };
}

interface Actions {
  setSidebarScrollOffset: (offset: number) => void;
}

export interface SidebarSlice extends Store, Actions {}

export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  sidebar: { scrollOffset: 0 },
  setSidebarScrollOffset: (offset) => {
    set(() => ({ sidebar: { scrollOffset: offset } }));
  },
});
