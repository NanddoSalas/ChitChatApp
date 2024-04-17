import Scrollbars from 'react-custom-scrollbars-2';

export const SidebarContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-gray-900 grow">
      <Scrollbars>
        <div className="flex grow flex-col gap-y-5 px-6 pt-6 h-full">
          {children}
        </div>
      </Scrollbars>
    </div>
  );
};
