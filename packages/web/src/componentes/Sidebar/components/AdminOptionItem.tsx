import { useStore } from '../../../store';
import { NavigationPath } from '../../../types/resources';
import { NavItemContainer } from './NavItemContainer';

interface AdminOptionItemProps {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  href: NavigationPath;
}

export const AdminOptionItem: React.FC<AdminOptionItemProps> = ({
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
    <NavItemContainer onClick={handleClick} selected={current}>
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />

      {name}
    </NavItemContainer>
  );
};
