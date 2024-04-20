import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

interface SubScreenContainerProps {
  children: React.ReactNode;
  disableOverflow?: boolean;
}

export const SubScreenContainer: React.FC<SubScreenContainerProps> = ({
  children,
  disableOverflow,
}) => {
  return (
    <main className="lg:pl-72 h-dvh flex flex-col bg-gray-100">
      {disableOverflow ? <>{children}</> : <Scrollbars>{children}</Scrollbars>}
    </main>
  );
};
