import { Navigation } from '../componentes/Navigation';
import Sidebar from '../componentes/Sidebar';

export const MainScreen = () => {
  return (
    <div>
      <Sidebar />

      <main className="lg:pl-72 h-dvh">
        <Navigation />
      </main>
    </div>
  );
};
