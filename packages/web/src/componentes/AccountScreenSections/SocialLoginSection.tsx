import { GitHubButton } from '../Buttons/GitHubButton';
import { GoogleButton } from '../Buttons/GoogleButton';

interface SocialLoginSectionProps {
  hasGoogle: boolean;
  hasGitHub: boolean;
  hasPassword: boolean;
}

export const SocialLoginSection: React.FC<SocialLoginSectionProps> = ({
  hasGitHub,
  hasGoogle,
  hasPassword,
}) => {
  const handleGoogleButton = () => {};

  const canDisconnectGoogle = hasPassword || hasGitHub;

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
        <div className="px-4 py-6 sm:p-8">
          <div className="grid grid-cols-2 gap-4">
            <GoogleButton
              onClick={handleGoogleButton}
              disabled={!canDisconnectGoogle}
              placeholder={hasGoogle ? 'Disconnect' : 'Connect'}
            />

            <GitHubButton disabled />
          </div>
        </div>
      </div>
    </div>
  );
};
