import { classNames } from '../utils';

interface InputProps {
  value: string;
  type: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  disabled,
  type,
}) => {
  return (
    <input
      type={type}
      className={classNames(
        'block w-full rounded-md border-0 py-1.5 text-gray-900',
        'shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400',
        'focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
      )}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      value={value}
    />
  );
};
