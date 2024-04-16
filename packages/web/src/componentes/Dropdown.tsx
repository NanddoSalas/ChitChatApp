import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';

type Option = {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
};

interface DropdownProps {
  options: Option[];
}

export const Dropdown: React.FC<DropdownProps> = ({ options }) => (
  <div className="dropdown dropdown-end static">
    <div
      tabIndex={0}
      role="button"
      className="btn btn-neutral btn-outline btn-sm lg:btn-md m-1"
    >
      Options
      <ChevronDownIcon
        className="-mr-1 h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </div>

    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-box w-52 mr-12"
    >
      {options.map((option) => (
        <li>
          <a href="#" onClick={option.onClick}>
            {option.icon}

            {option.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
