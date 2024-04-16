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
        'btn btn-block btn-outline flex justify-start',
        current ? 'btn-active' : 'text-gray-400 border-0',
      )}
      onClick={handleClick}
    >
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />

      {name}
    </a>
  );
};
