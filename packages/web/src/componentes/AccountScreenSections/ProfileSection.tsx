import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useContext } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';
import { z } from 'zod';
import { AuthContext } from '../../AuthContext';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { User } from '../../types/api/resources';
import { UpdateProfileErrors, UpdateProfileForm } from '../../types/api/users';
import { classNames } from '../../utils';

export const ProfileSection: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isPending, mutate, isSuccess, error, reset } = useAuthMutation<
    null,
    UpdateProfileErrors,
    UpdateProfileForm
  >(
    {
      mutationKey: [`/users/${user?.id}/profile`],
      onSuccess: (_data, variables) => {
        setUser((current) => ({ ...current!, ...variables }));

        queryClient.setQueryData<User[]>(['/users'], (oldData) => {
          if (oldData) {
            return oldData.map((u) =>
              u.id === user!.id ? { ...u, ...variables } : u,
            );
          }
        });
      },
    },
    'put',
  );

  const form = useForm({
    defaultValues: {
      fullName: user!.fullName,
      about: user!.about,
    },
    onSubmit: async ({ value }) => {
      if (value.about !== user?.about || value.fullName !== user.fullName) {
        mutate(value);
      }
    },
    validatorAdapter: zodValidator,
  });

  const handleReset = () => {
    reset();
    form.reset();
  };

  const disabled = isPending || isSuccess;

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
            <div className="col-span-full flex">
              <Avatar {...genConfig(user?.email)} className="w-32 h-32" />
            </div>

            <div className="sm:col-span-3">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Full Name</span>
                </div>

                <form.Field
                  name="fullName"
                  validators={{ onBlur: z.string().min(1).max(64) }}
                  children={(field) => {
                    return (
                      <>
                        <input
                          type="text"
                          className={classNames(
                            'input input-bordered w-full',
                            field.state.meta.touchedErrors.length > 0
                              ? 'input-error'
                              : '',
                            error?.fullName ? 'input-error' : '',
                            isSuccess ? 'input-disabled' : '',
                          )}
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={disabled}
                        />
                        <div className="pt-2">
                          {error?.fullName ? (
                            <span className="text-red-500">
                              {error.fullName}
                            </span>
                          ) : (
                            field.state.meta.touchedErrors.map((m) => (
                              <span className="text-red-500">{m}</span>
                            ))
                          )}
                        </div>
                      </>
                    );
                  }}
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
                  value={user!.email}
                  disabled
                />
              </label>
            </div>

            <div className="col-span-full">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>

                <form.Field
                  name="about"
                  validators={{ onBlur: z.string().min(0).max(256) }}
                  children={(field) => {
                    return (
                      <>
                        <textarea
                          rows={3}
                          className={classNames(
                            'input input-bordered w-full',
                            field.state.meta.touchedErrors.length > 0
                              ? 'input-error'
                              : '',
                            error?.fullName ? 'input-error' : '',
                            isSuccess ? 'input-disabled' : '',
                          )}
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={disabled}
                        ></textarea>

                        <div className="pt-2">
                          {error?.fullName ? (
                            <span className="text-red-500">{error.about}</span>
                          ) : (
                            field.state.meta.touchedErrors.map((m) => (
                              <span className="text-red-500">{m}</span>
                            ))
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              </label>

              <p className="mt-3">Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          {isSuccess && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Profile's been updated Successfully!</span>
            </div>
          )}

          <button
            className="btn btn-neutral btn-outline btn-sm lg:btn-md"
            onClick={handleReset}
            disabled={isPending}
          >
            Reset
          </button>

          <button
            className="btn btn-neutral btn-sm lg:btn-md"
            onClick={form.handleSubmit}
            disabled={disabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
