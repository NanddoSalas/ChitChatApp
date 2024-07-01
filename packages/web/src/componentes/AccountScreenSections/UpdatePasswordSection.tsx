import { useState } from 'react';

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
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">New Password</span>
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="sm:col-span-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Confirm Password</span>
                </div>

                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </label>
            </div>

            <div className="sm:col-span-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Current Password</span>
                </div>

                <input
                  type="password"
                  className="input input-bordered w-full max-w-xs"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled={!hasPassword}
                />
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="flex justify-end h-full items-end">
                <div className="space-x-6">
                  <button
                    className="btn btn-neutral btn-outline btn-sm lg:btn-md"
                    onClick={handleCancel}
                    disabled={!isModified}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-neutral btn-sm lg:btn-md"
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
