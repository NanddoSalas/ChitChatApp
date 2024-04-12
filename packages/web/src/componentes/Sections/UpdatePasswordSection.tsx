import { useState } from 'react';
import { Input } from '../Input';

interface UpdatePasswordSectionProps {
  hasPassword: boolean;
  onSave: (newPassword: string) => void;
}

export const UpdatePasswordSection: React.FC<UpdatePasswordSectionProps> = ({
  hasPassword,
  onSave,
}) => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const isModified = password !== '' || password2 !== '' || oldPassword !== '';

  const handleCancel = () => {
    setPassword('');
    setPassword2('');
    setOldPassword('');
  };

  const handleSave = () => {
    if (hasPassword) {
      if (oldPassword) {
        onSave(password);
      }
    } else {
      onSave(password);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3 px-0 2xl:px-24 3xl:px-32">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Update your password associated with your account.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 max-w-3xl">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>

              <div className="mt-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(value) => setPassword(value)}
                  disabled={!hasPassword}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>

              <div className="mt-2">
                <Input
                  type="password"
                  value={password2}
                  onChange={(value) => setPassword2(value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current password
              </label>

              <div className="mt-2">
                <Input
                  type="password"
                  value={oldPassword}
                  onChange={(value) => setOldPassword(value)}
                  disabled={!hasPassword}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <div className="flex justify-end h-full items-end">
                <div className="space-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleCancel}
                    disabled={!isModified}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSave}
                    disabled={!isModified}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
