import Scrollbars from 'react-custom-scrollbars-2';

export const DrawerSidebarContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex grow flex-col bg-gray-900 ring-1 ring-white/10 h-full">
      <Scrollbars style={{ width: 250 }}>
        <div className="flex grow flex-col gap-y-5 px-6 pt-6 h-full">
          {children}
        </div>
      </Scrollbars>
    </div>
  );
};
