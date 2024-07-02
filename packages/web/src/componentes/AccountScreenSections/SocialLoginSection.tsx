import { useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import { useAuthMutation } from '../../hooks/useAuthMutation';
import { GenericErrorMessage } from '../../types/api';
import { GoogleSignInForm } from '../../types/api/authentication';
import { GitHubButton } from '../Buttons/GitHubButton';
import { GoogleButton } from '../Buttons/GoogleButton';

export const SocialLoginSection: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const connectGoogle = useAuthMutation<
    null,
    GenericErrorMessage,
    GoogleSignInForm
  >(
    {
      mutationKey: [`/users/${user?.id}/google`],
      onSuccess: () => {
        setUser((current) => ({ ...current!, hasGoogle: true }));
      },
    },
    'put',
  );

  const disconnectGoole = useAuthMutation<null, GenericErrorMessage, null>(
    {
      mutationKey: [`/users/${user?.id}/google`],
      onSuccess: () => {
        setUser((current) => ({ ...current!, hasGoogle: false }));
      },
    },
    'delete',
  );

  const { hasGitHub, hasGoogle, hasPassword } = user!;
  const canDisconnectGoogle = hasPassword || hasGitHub;

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      connectGoogle.mutate({ code: codeResponse.code });
    },
  });

  const handleGoogleButton = () => {
    if (canDisconnectGoogle) {
      if (hasGoogle) {
        disconnectGoole.mutate(null);
      } else {
        googleLogin();
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3 px-0 2xl:px-24 3xl:px-32">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Social Login
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Connect your social media accounts so you can Sign in faster.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 max-w-3xl">
        <div className="px-4 py-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <GoogleButton
              onClick={handleGoogleButton}
              disabled={
                !canDisconnectGoogle ||
                connectGoogle.isPending ||
                disconnectGoole.isPending
              }
              loading={connectGoogle.isPending || disconnectGoole.isPending}
              placeholder={hasGoogle ? 'Disconnect' : 'Connect'}
            />

            <GitHubButton disabled />
          </div>

          {connectGoogle.isError && (
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

              <span>{connectGoogle.error?.message}</span>
            </div>
          )}

          {disconnectGoole.isError && (
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

              <span>{disconnectGoole.error?.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
