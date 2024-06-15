import { useEffect } from 'react';
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

export const DashboardScreen = () => {
  const openSearchBar = useStore((state) => state.openSearchBar);

  const retrieveUsers = useStore((state) => state.retrieveUsers);
  const retrieveRooms = useStore((state) => state.retrieveRooms);
  const retrieveInvitations = useStore((state) => state.retrieveInvitations);

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

  useHotkeys('ctrl+k', openSearchBar, { preventDefault: true });
  useEffect(() => {
    retrieveRooms();
    retrieveUsers();
    retrieveInvitations();
  }, [retrieveRooms, retrieveUsers, retrieveInvitations]);

  return <Drawer content={<DraweContent />} side={<DrawerSide />} />;
};
