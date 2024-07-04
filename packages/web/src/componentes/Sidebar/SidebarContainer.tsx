import { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useStore } from '../../store';

export const SidebarContainer: React.FC<{
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
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gray-900 grow">
      <Scrollbars
        ref={ref}
        onScrollStop={() => {
          setScrollOffset(ref.current?.getScrollTop() || 0);
        }}
      >
        <div className="flex grow flex-col gap-y-5 px-6 pt-6 h-full">
          {children}
        </div>
      </Scrollbars>
    </div>
  );
};
