import { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useStore } from '../../store';

export const DrawerSidebarContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const ref = useRef<Scrollbars>(null);
  const { scrollOffset } = useStore((state) => state.sidebar);
  const setScrollOffset = useStore((state) => state.setSidebarScrollOffset);

  useEffect(() => {
    ref.current?.scrollTop(scrollOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex grow flex-col bg-gray-900 ring-1 ring-white/10 h-full">
      <Scrollbars
        onScrollFrame={(x) => setScrollOffset(x.scrollTop)}
        ref={ref}
        style={{ width: 250 }}
      >
        <div className="flex grow flex-col gap-y-5 px-6 pt-6 h-full">
          {children}
        </div>
      </Scrollbars>
    </div>
  );
};
