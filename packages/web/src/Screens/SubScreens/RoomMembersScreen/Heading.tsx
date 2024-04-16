import { PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../../componentes/Breadcrumbs';

export const Heading = () => {
  return (
    <div className="border-b border-gray-300 pb-5 flex items-center justify-between">
      <Breadcrumb
        items={[
          { name: 'Rooms', path: '/rooms' },
          { name: 'Some Room Name', path: null },
        ]}
      />

      <div className="flex">
        <button
          type="button"
          className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          <span className="flex space-x-1">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />

            <span>Add Member</span>
          </span>
        </button>
      </div>
    </div>
  );
};
