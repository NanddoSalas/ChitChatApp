import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useContext } from 'react';
import { z } from 'zod';
import { AuthContext } from '../../AuthContext';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import {
  UpdatePasswordErrors,
  UpdatePasswordForm,
} from '../../types/api/users';
import { classNames } from '../../utils';

export const UpdatePasswordSection: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { isPending, mutate, isSuccess, isError, error, reset } =
    useAuthMutation<null, UpdatePasswordErrors, UpdatePasswordForm>(
      {
        mutationKey: [`/users/${user?.id}/password`],
        onSuccess: () => {
          setUser((current) => ({ ...current!, hasPassword: true }));
        },
      },
      'put',
    );

  const form = useForm({
    defaultValues: {
      password: '',
      password2: '',
      oldPassword: '',
    },
    onSubmit: async ({ value }) => {
      mutate({
        newPassword: value.password,
        oldPassword: user!.hasPassword ? value.oldPassword : undefined,
      });
    },
    validatorAdapter: zodValidator,
  });

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

                <form.Field
                  name="password"
                  validators={{
                    onBlur: z.string().min(8).max(32),
                  }}
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
                          )}
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={isPending || isSuccess}
                        />
                        <div className="pt-2">
                          {field.state.meta.touchedErrors.map((m, i) => (
                            <span key={i} className="text-red-500">
                              {m}
                            </span>
                          ))}
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
                  <span className="label-text">Confirm Password</span>
                </div>

                <form.Field
                  name="password2"
                  validators={{
                    onChangeListenTo: ['password'],
                    onBlur: ({ value, fieldApi }) => {
                      if (value !== fieldApi.form.getFieldValue('password')) {
                        return 'Passwords do not match';
                      }
                      return undefined;
                    },
                  }}
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
                          )}
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={isPending || isSuccess}
                        />
                        <div className="pt-2">
                          {field.state.meta.touchedErrors.map((m, i) => (
                            <span key={i} className="text-red-500">
                              {m}
                            </span>
                          ))}
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
                  <span className="label-text">Current Password</span>
                </div>

                <form.Field
                  name="oldPassword"
                  validators={{
                    onBlur: user!.hasPassword
                      ? z.string().min(8).max(32)
                      : undefined,
                  }}
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
                            isError ? 'input-error' : '',
                          )}
                          required
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          disabled={
                            !user!.hasPassword || isPending || isSuccess
                          }
                        />
                        <div className="pt-2">
                          {field.state.meta.touchedErrors.map((m, i) => (
                            <span key={i} className="text-red-500">
                              {m}
                            </span>
                          ))}
                          {isError && (
                            <span className="text-red-500">
                              {error.oldPassword}
                            </span>
                          )}
                        </div>
                      </>
                    );
                  }}
                />
              </label>
            </div>

            <div className="sm:col-span-3">
              <div className="flex justify-end h-full items-end">
                <div className="space-x-6">
                  <button
                    className="btn btn-neutral btn-outline btn-sm lg:btn-md"
                    onClick={() => {
                      form.reset();
                      reset();
                    }}
                    disabled={isPending}
                  >
                    Reset
                  </button>

                  <button
                    className="btn btn-neutral btn-sm lg:btn-md"
                    onClick={form.handleSubmit}
                    disabled={isPending || isSuccess}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isSuccess && (
            <div role="alert" className="alert alert-success mt-8">
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
              <span>Password's been updated Successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
