import { classNames } from '../utils';

export const MessageSkeleton = () => (
  <div className={classNames('py-5 flex space-x-6 px-4 sm:px-6 lg:px-8')}>
    <div className="w-14 h-14 rounded-full skeleton" />

    <div className="flex flex-col justify-around">
      <div className="flex space-x-2">
        <div className="skeleton h-[20px] w-24" />

        <div className="skeleton h-[20px] w-32" />
      </div>

      <div className="skeleton h-[20px] w-96" />
    </div>
  </div>
);
