import { Drawer } from '../componentes/Drawer';
import { Navigation } from '../componentes/Navigation';
import {
  DrawerSidebarContainer,
  Sidebar,
  SidebarContainer,
} from '../componentes/Sidebar';

export const MainScreen = () => {
  const DraweContent = () => (
    <>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <main className="lg:pl-72 h-dvh flex flex-col">
        <Navigation />
      </main>
    </>
  );

  const DrawerSide = () => (
    <DrawerSidebarContainer>
      <Sidebar />
    </DrawerSidebarContainer>
  );

  return <Drawer content={<DraweContent />} side={<DrawerSide />} />;
};
