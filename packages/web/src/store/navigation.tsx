import { StateCreator } from 'zustand';
import { NavigationPath } from '../types/resources';

interface State {
  navigation: {
    path: NavigationPath;
    id: number | null;
  };
}

interface Actions {
  navigate: (path: NavigationPath, id: number | null) => void;
}

export interface NavigationSlice extends State, Actions {}

export const createNavigationSlice: StateCreator<NavigationSlice> = (set) => ({
  navigation: { path: '/', id: null },
  navigate: (path, id) => {
    set({ navigation: { path, id } });
  },
});
