import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';
import { GoogleButton } from '../../componentes/GoogleButton';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import {
  GoogleSignUpErrors,
  GoogleSignUpForm,
  SignUpForm,
  SingUpErrors,
} from '../../types/api/authentication';
import { classNames } from '../../utils';

export const SignUpScreen = () => {
  const passwordSignUp = useAuthMutation<null, SingUpErrors, SignUpForm>({
    mutationKey: ['/auth/signup'],
  });

  const googleSignUp = useAuthMutation<
    null,
    GoogleSignUpErrors,
    GoogleSignUpForm
  >({
    mutationKey: ['/auth/signup/google'],
  });

  const form = useForm({
    defaultValues: {
      fullName: 'Luis Fernando Cano Salas',
      email: 'nanddosalas@gmail.com',
      password: 'password',
      inviteCode: 'INVITE1234',
    },
    onSubmit: async ({ value }) => {
      passwordSignUp.mutate(value);
    },
    validatorAdapter: zodValidator,
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      googleSignUp.mutate({
        code: codeResponse.code,
        inviteCode: 'INVITE1234',
      });
    },
  });

  const isSigningUp = passwordSignUp.isPending || googleSignUp.isPending;
  const isSuccess = passwordSignUp.isSuccess || googleSignUp.isSuccess;
  const isDisabled = isSigningUp || isSuccess;
  const error = passwordSignUp.error;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="ChitChatZone"
        />

        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ChitChatZone
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="space-y-6">
            {isSuccess && (
              <div role="alert" className="alert alert-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
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
                <span>Account has been created!</span>
                <div>
                  <Link className="btn btn-sm btn-success" to="/auth/signin">
                    Sign in
                  </Link>
                </div>
              </div>
            )}

            <label className="form-control w-full">
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
                        disabled={isDisabled}
                      />
                      <div className="pt-2">
                        {error?.fullName ? (
                          <span className="text-red-500">{error.fullName}</span>
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

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email address</span>
              </div>

              <form.Field
                name="email"
                validators={{ onBlur: z.string().email() }}
                children={(field) => {
                  return (
                    <>
                      <input
                        type="email"
                        className={classNames(
                          'input input-bordered w-full',
                          field.state.meta.touchedErrors.length > 0
                            ? 'input-error'
                            : '',
                          error?.email ? 'input-error' : '',
                          isSuccess ? 'input-disabled' : '',
                        )}
                        required
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isDisabled}
                      />
                      <div className="pt-2">
                        {error?.email ? (
                          <span className="text-red-500">{error.email}</span>
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

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
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
                        type="password"
                        className={classNames(
                          'input input-bordered w-full',
                          field.state.meta.touchedErrors.length > 0
                            ? 'input-error'
                            : '',
                          error?.password ? 'input-error' : '',
                          isSuccess ? 'input-disabled' : '',
                        )}
                        required
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isDisabled}
                      />
                      <div className="pt-2">
                        {error?.password ? (
                          <span className="text-red-500">{error.password}</span>
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

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Invitation Code</span>
              </div>

              <form.Field
                name="inviteCode"
                validators={{
                  onBlur: z.string().nonempty(),
                }}
                children={(field) => (
                  <>
                    <input
                      type="text"
                      className={classNames(
                        'input input-bordered w-full',
                        field.state.meta.touchedErrors.length > 0
                          ? 'input-error'
                          : '',
                        error?.inviteCode ? 'input-error' : '',
                        isSuccess ? 'input-disabled' : '',
                      )}
                      required
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isDisabled}
                    />
                    <div className="pt-2">
                      {error?.inviteCode ? (
                        <span className="text-red-500">{error.inviteCode}</span>
                      ) : (
                        field.state.meta.touchedErrors.map((m) => (
                          <span className="text-red-500">{m}</span>
                        ))
                      )}
                    </div>
                  </>
                )}
              />
            </label>

            <button
              className={classNames(
                'btn btn-block btn-outline',
                isDisabled ? 'btn-disabled' : '',
              )}
              onClick={form.handleSubmit}
            >
              {passwordSignUp.isPending ? (
                <span
                  className={classNames('loading loading-dots loading-md')}
                ></span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div>
            <div className="relative mt-6">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <GoogleButton
                onClick={googleLogin}
                disabled={isDisabled}
                loading={googleSignUp.isPending}
              />

              {googleSignUp.error && (
                <div role="alert" className="alert alert-error">
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
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                  <span>{googleSignUp.error?.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm ">
          Already have an account?{' '}
          <Link className="link link-hover" to="/auth/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
