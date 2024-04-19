import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useStore } from '../../../store';
import { classNames } from '../../../utils';

export const SearchButton = () => {
  const open = useStore((state) => state.openSearchBar);

  return (
    <button
      className={classNames(
        'w-full rounded-md py-1.5 px-2.5',
        'bg-gray-700 hover:bg-gray-600',
        'text-gray-400 hover:text-gray-300',
        'flex justify-between items-center',
      )}
      onClick={open}
    >
      <span className="flex items-center space-x-2.5">
        <MagnifyingGlassIcon className="w-5 h-5" />

        <span>Search</span>
      </span>

      <kbd className="inline-flex items-center rounded border border-gray-400 px-1 font-sans text-xs text-gray-400">
        ⌘K
      </kbd>
    </button>
  );
};
