import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

interface SubScreenContainerProps {
  children: React.ReactNode;
}

export const SubScreenContainer: React.FC<SubScreenContainerProps> = ({
  children,
}) => {
  return (
    <main className="lg:pl-72 h-dvh flex flex-col bg-gray-100">
      <Scrollbars>{children}</Scrollbars>
    </main>
  );
};
