import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { useHotkeys } from 'react-hotkeys-hook';
import { Drawer } from '../componentes/Drawer';
import { SearchBar } from '../componentes/SearchBar';
import {
  DrawerSidebarContainer,
  Sidebar,
  SidebarContainer,
} from '../componentes/Sidebar';
import { useStomp } from '../hooks/useStomp';
import { useStore } from '../store';

export const DashboardScreen = () => {
  useStomp();
  const openSearchBar = useStore((state) => state.openSearchBar);
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    if (location.pathname !== '/') {
      navigate({ to: '/' });
    }
  };

  const DraweContent = () => (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <Outlet />

      <SearchBar />
    </>
  );

  const DrawerSide = () => (
    <DrawerSidebarContainer>
      <Sidebar />
    </DrawerSidebarContainer>
  );

  useHotkeys('ctrl+k', openSearchBar, { preventDefault: true });
  useHotkeys('escape', navigateToHome, {
    preventDefault: true,
  });

  return <Drawer content={<DraweContent />} side={<DrawerSide />} />;
};
