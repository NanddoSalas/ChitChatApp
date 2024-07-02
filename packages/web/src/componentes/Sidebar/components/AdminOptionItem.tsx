import { useLocation, useNavigate } from '@tanstack/react-router';
import { NavItemContainer } from './NavItemContainer';

interface AdminOptionItemProps {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  href: string;
}

export const AdminOptionItem: React.FC<AdminOptionItemProps> = ({
  name,
  icon: Icon,
  href,
}) => {
  const current = useLocation().pathname === href;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!current) {
      navigate({ to: href });
    }
  };

  return (
    <NavItemContainer onClick={handleClick} selected={current}>
      <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />

      {name}
    </NavItemContainer>
  );
};
