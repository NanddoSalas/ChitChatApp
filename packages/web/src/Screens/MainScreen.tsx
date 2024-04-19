import { useHotkeys } from 'react-hotkeys-hook';
import { Drawer } from '../componentes/Drawer';
import { Navigation } from '../componentes/Navigation';
import { SearchBar } from '../componentes/SearchBar';
import {
  DrawerSidebarContainer,
  Sidebar,
  SidebarContainer,
} from '../componentes/Sidebar';
import { useStore } from '../store';

export const MainScreen = () => {
  const openSearchBar = useStore((state) => state.openSearchBar);

  useHotkeys('ctrl+k', openSearchBar, { preventDefault: true });

  const DraweContent = () => (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <Navigation />

      <SearchBar />
    </>
  );

  const DrawerSide = () => (
    <DrawerSidebarContainer>
      <Sidebar />
    </DrawerSidebarContainer>
  );

  return <Drawer content={<DraweContent />} side={<DrawerSide />} />;
};
