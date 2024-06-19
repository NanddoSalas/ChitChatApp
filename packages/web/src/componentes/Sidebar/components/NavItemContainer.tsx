import { classNames } from '../../../utils';

interface NavItemContainerProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const NavItemContainer: React.FC<NavItemContainerProps> = ({
  selected,
  onClick,
  children,
}) => {
  return (
    <label htmlFor="sidebar-drawer">
      <a
        className={classNames(
          'btn btn-block btn-outline flex justify-start flex-nowrap',
          selected ? 'btn-active no-animation' : 'text-gray-400 border-0',
        )}
        onClick={onClick}
      >
        {children}
      </a>
    </label>
  );
};
