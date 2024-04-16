import { useStore } from '../../../store';
import { NavigationPath } from '../../../types/resources';
import { classNames } from '../../../utils';

interface NavigationItemProps {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  href: NavigationPath;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  name,
  icon: Icon,
  href,
}) => {
  const navigate = useStore((state) => state.navigate);
  const current = useStore((state) => state.navigation.path) === href;

  const handleClick = () => {
    navigate(href, null);
  };

  return (
    <a
      className={classNames(
        current
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800',
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
      )}
      onClick={handleClick}
    >
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />

      {name}
    </a>
  );
};
