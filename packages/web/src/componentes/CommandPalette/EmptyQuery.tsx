import { UsersIcon } from '@heroicons/react/24/outline';

export const EmptyQuery = () => {
  return (
    <div className="px-4 py-14 text-center sm:px-14">
      <UsersIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
      <p className="mt-4 text-sm text-gray-900">
        No people found using that search term.
      </p>
    </div>
  );
};
