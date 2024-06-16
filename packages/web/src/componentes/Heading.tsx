import { classNames } from '../utils';

interface HeadingProps {
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ start, center, end }) => (
  <div
    className={classNames(
      'space-y-4 sm:space-y-6 lg:space-y-8 flex-1',
      'pt-4 sm:pt-6 lg:pt-8',
      'hidden lg:block',
    )}
  >
    <div className="navbar border-b border-gray-300 pb-5 flex items-center justify-between">
      <div className="navbar-start">{start}</div>

      <div className="navbar-center">{center}</div>

      <div className="navbar-end">{end}</div>
    </div>
  </div>
);
