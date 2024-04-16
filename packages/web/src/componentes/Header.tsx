import React from 'react';

interface HeaderProps {
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ start, center, end }) => (
  <div className="lg:hidden">
    <div className="navbar bg-gray-900 p-4">
      {start && <div className="navbar-start">{start}</div>}

      {center && <div className="navbar-center">{center}</div>}

      {end && <div className="navbar-end">{end}</div>}
    </div>
  </div>
);
