/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../../componentes/Breadcrumbs';

export default function Heading() {
  return (
    <div className="border-b border-gray-300 pb-5 sm:flex sm:items-center sm:justify-between">
      <Breadcrumb items={[{ name: 'Rooms', path: null }]} />

      <div className="flex">
        <button
          type="button"
          className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          <span className="flex space-x-1">
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>Create Room</span>
          </span>
        </button>

        <div className="mt-3 sm:ml-4 sm:mt-0">
          <label htmlFor="mobile-search-room" className="sr-only">
            Search
          </label>

          <label htmlFor="desktop-search-room" className="sr-only">
            Search
          </label>

          <div className="flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>

              <input
                type="text"
                name="mobile-search-room"
                id="mobile-search-room"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                placeholder="Search Rooms"
              />

              <input
                type="text"
                name="desktop-search-room"
                id="desktop-search-room"
                className="hidden w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                placeholder="Search Room"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
