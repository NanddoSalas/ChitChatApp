import React from 'react';

interface SubScreenLayoutProps {
  children: React.ReactNode;
}

export const SubScreenLayout: React.FC<SubScreenLayoutProps> = ({
  children,
}) => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
    {children}
  </div>
);
