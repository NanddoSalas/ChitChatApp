import { useGoogleLogin } from '@react-oauth/google';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { useContext, useEffect } from 'react';
import { z } from 'zod';
import { AuthContext } from '../../AuthContext';
import { GoogleButton } from '../../componentes/Buttons/GoogleButton';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import {
  GoogleSignInForm,
  SignInForm,
  SingInData,
  SingInErrors,
} from '../../types/api/authentication';
import { classNames } from '../../utils';

export const SignInScreen = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const googleSignIn = useAuthMutation<
    SingInData,
    SingInErrors,
    GoogleSignInForm
  >({
    mutationKey: ['/auth/signin/google'],
    onSuccess: (data) => {
      signIn(data.user, data.accessToken);
    },
  });

  const passwordSignIn = useAuthMutation<SingInData, SingInErrors, SignInForm>({
    mutationKey: ['/auth/signin'],
    onSuccess: (data) => {
      signIn(data.user, data.accessToken);
    },
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      googleSignIn.mutate({ code: codeResponse.code });
    },
  });

  const form = useForm({
    defaultValues: {
      email: 'alice.johnson@example.com',
      password: 'password',
    },
    onSubmit: async ({ value }) => {
      passwordSignIn.mutate(value);
    },
    validatorAdapter: zodValidator,
  });

  const isSigningIn = passwordSignIn.isPending || googleSignIn.isPending;
  const errorMessage = passwordSignIn.error?.message;

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
      queryClient.clear();
      queryClient.getQueryCache().clear();
    }
  }, [isAuthenticated, navigate, queryClient]);

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
                          errorMessage ? 'input-error' : '',
                        )}
                        required
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        disabled={isSigningIn}
                      />
                      <div className="pt-2">
                        {field.state.meta.touchedErrors.map((m) => (
                          <span className="text-red-500">{m}</span>
                        ))}
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
                  onBlur: z
                    .string()
                    .min(8, 'Invalid credentials')
                    .max(32, 'Invalid credentials'),
                }}
                children={(field) => (
                  <>
                    <input
                      type="password"
                      className={classNames(
                        'input input-bordered w-full',
                        field.state.meta.touchedErrors.length > 0
                          ? 'input-error'
                          : '',
                        errorMessage ? 'input-error' : '',
                      )}
                      required
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isSigningIn}
                    />
                    <div className="pt-2">
                      {errorMessage ? (
                        <span className="text-red-500">{errorMessage}</span>
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
                isSigningIn ? 'btn-disabled' : '',
              )}
              onClick={form.handleSubmit}
            >
              {passwordSignIn.isPending ? (
                <span className="loading loading-dots loading-md"></span>
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
                disabled={isSigningIn}
                loading={googleSignIn.isPending}
              />

              {googleSignIn.error && (
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

                  <span>{googleSignIn.error.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm ">
          Have an invitation code?{' '}
          <Link className="link link-hover" to="/auth/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
