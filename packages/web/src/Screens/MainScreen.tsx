import Scrollbars from 'react-custom-scrollbars-2';
import { useHotkeys } from 'react-hotkeys-hook';
import { CommandPalette } from '../componentes/CommandPalette';
import { Drawer } from '../componentes/Drawer';
import { Navigation } from '../componentes/Navigation';
import {
  DrawerSidebarContainer,
  Sidebar,
  SidebarContainer,
} from '../componentes/Sidebar';
import { useStore } from '../store';

export const MainScreen = () => {
  const openCommandPalette = useStore((state) => state.openCommandPalette);

  useHotkeys('ctrl+k', openCommandPalette, { preventDefault: true });

  const DraweContent = () => (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <Scrollbars>
        <main className="lg:pl-72 h-dvh flex flex-col">
          <Navigation />
        </main>
      </Scrollbars>

      <CommandPalette />
    </>
  );

  const DrawerSide = () => (
    <DrawerSidebarContainer>
      <Sidebar />
    </DrawerSidebarContainer>
  );

  return <Drawer content={<DraweContent />} side={<DrawerSide />} />;
};
