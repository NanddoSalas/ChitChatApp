import Breadcrumb from '../../../componentes/Breadcrumbs';

export const Heading = () => {
  return (
    <div className="border-b border-gray-300 pb-5 sm:flex sm:items-center sm:justify-between">
      <Breadcrumb items={[{ name: 'Users', path: null }]} />

      {/* <div className="mt-3 sm:ml-4 sm:mt-0">
        <label htmlFor="mobile-search-user" className="sr-only">
          Search
        </label>

        <label htmlFor="desktop-search-user" className="sr-only">
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
              name="mobile-search-user"
              id="mobile-search-user"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
              placeholder="Search Users"
            />

            <input
              type="text"
              name="desktop-search-user"
              id="desktop-search-user"
              className="hidden w-full rounded-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
              placeholder="Search Users"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};
