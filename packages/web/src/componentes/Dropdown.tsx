import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { classNames } from '../utils';

type Option = {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
};

interface DropdownProps {
  options: Option[];
  loading: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ options, loading }) => (
  <div className="dropdown dropdown-end static">
    <div
      tabIndex={0}
      role="button"
      className={classNames(
        'btn btn-neutral btn-outline btn-sm lg:btn-md m-1',
        loading ? 'btn-disabled' : '',
      )}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <>
          Options
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </>
      )}
    </div>

    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-box w-52 mr-12"
    >
      {options.map((option, i) => (
        <li key={i}>
          <a href="#" onClick={option.onClick}>
            {option.icon}

            {option.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
