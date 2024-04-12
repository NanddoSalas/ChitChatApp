import { HomeIcon } from '@heroicons/react/20/solid';
import { useStore } from '../store';
import { NavigationPath } from '../store/types';
import { classNames } from '../utils';

type BreadcrumbItem = {
  name: string;
  path: NavigationPath | null;
};

interface BreadcrumpProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumpProps> = ({ items }) => {
  const navigate = useStore((state) => state.navigate);

  const handleHomeClick = () => {
    navigate('/', null);
  };

  const handleItemClick = (path: NavigationPath | null) => {
    if (path) {
      navigate(path, null);
    }
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-900"
              onClick={handleHomeClick}
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />

              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {items.map(({ name, path }, index) => {
          const isLast = items.length - 1 === index;

          return (
            <li key={index}>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>

                <a
                  className={classNames(
                    'ml-4 text-md font-bold',
                    isLast
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 cursor-pointer',
                  )}
                  aria-current={index === items.length - 1 ? 'page' : undefined}
                  onClick={() => handleItemClick(path)}
                >
                  {name}
                </a>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
