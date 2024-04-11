import { useStore } from '../../../store';

export const ProfileButton = () => {
  const navigate = useStore((state) => state.navigate);

  const handleClick = () => {
    navigate('/account', null);
  };

  return (
    <a
      href="#"
      className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
      onClick={handleClick}
    >
      <img
        className="h-8 w-8 rounded-full bg-gray-800"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
      <span className="sr-only">Your profile</span>
      <span aria-hidden="true">Tom Cook</span>
    </a>
  );
};
