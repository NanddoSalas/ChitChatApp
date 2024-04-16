import React from 'react';

interface DrawerProps {
  content: React.ReactNode;
  side: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ content, side }) => {
  return (
    <div className="drawer">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content h-dvh">{content}</div>

      <div className="drawer-side lg:hidden">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        {side}
      </div>
    </div>
  );
};

export const OpenDraweButton = () => (
  <label htmlFor="sidebar-drawer" className="btn btn-square btn-neutral">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </label>
);
