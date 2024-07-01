import { useState } from 'react';
import { classNames } from '../../utils';

interface ProfileSectionProps {
  avatar: string;
  fullName: string;
  email: string;
  about: string;
  onSave: (fullName: string, about: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = (props) => {
  const [fullName, setFullName] = useState(props.fullName);
  const [about, setAbout] = useState(props.about);
  const isModified = fullName !== props.fullName || about !== props.about;

  const handleCancel = () => {
    setFullName(props.fullName);
    setAbout(props.about);
  };

  const handleSave = () => props.onSave(fullName, about);

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3 px-0 2xl:px-24 3xl:px-32">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 max-w-3xl">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <div className="avatar">
                <div className="w-24 rounded-xl">
                  {props.avatar ? (
                    <img src={props.avatar} />
                  ) : (
                    <span
                      className={classNames(
                        'inline-block overflow-hidden rounded-full bg-gray-100 w-24 h-24',
                      )}
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              <div>
                <button className="btn btn-outline btn-sm lg:btn-md" disabled>
                  Change avatar
                </button>

                <p className="mt-2 text-xs leading-5 text-gray-900">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Full Name</span>
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>

            <div className="sm:col-span-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>

                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={props.email}
                  disabled
                />
              </label>
            </div>

            <div className="col-span-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>

                <textarea
                  className="textarea textarea-bordered h-24"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={3}
                ></textarea>
              </label>

              <p className="mt-3">Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            className="btn btn-neutral btn-outline btn-sm lg:btn-md"
            disabled={!isModified}
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-neutral btn-sm lg:btn-md"
            disabled={!isModified}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
