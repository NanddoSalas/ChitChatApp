import { classNames } from '../utils';

interface SkeletonProps {
  square?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ square }) => {
  return (
    <div className="flex gap-4 items-center btn btn-ghost btn-disabled justify-start">
      <div
        className={classNames('skeleton w-8 h-8 ', square ? 'rounded-md' : '')}
      ></div>

      <div className="skeleton h-4 w-24"></div>
    </div>
  );
};
