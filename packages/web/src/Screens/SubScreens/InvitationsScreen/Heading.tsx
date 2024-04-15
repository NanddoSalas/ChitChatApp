import { PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../../componentes/Breadcrumbs';

export default function Heading() {
  return (
    <div className="border-b border-gray-300 pb-5 sm:flex sm:items-center sm:justify-between">
      <Breadcrumb items={[{ name: 'Invitations', path: null }]} />

      <div className="flex">
        <button
          type="button"
          className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          <span className="flex space-x-1">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>Generate Invite Code</span>
          </span>
        </button>
      </div>
    </div>
  );
}
