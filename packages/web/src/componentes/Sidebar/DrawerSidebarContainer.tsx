export const DrawerSidebarContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 p-6 ring-1 ring-white/10 h-full">
      {children}
    </div>
  );
};
