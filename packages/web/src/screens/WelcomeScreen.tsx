import { Link } from '@tanstack/react-router';
import { GitHubButton } from '../componentes/Buttons/GitHubButton';
import { Logo } from '../componentes/Logo';

export const WelcomeScreen = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="mt-10 mx-6 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="space-y-6">
            <Logo />

            <Link
              className="btn btn-neutral btn-outline w-full"
              to="/auth/signin"
            >
              Sign in
            </Link>

            <Link
              className="btn btn-neutral btn-outline w-full"
              to="/auth/signup"
            >
              Sign up
            </Link>

            <GitHubButton
              placeholder="Source Code"
              onClick={() =>
                window.open('https://github.com/NanddoSalas/ChitChatApp')
              }
            />
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-sm ">
        Build by{' '}
        <a
          href="https://github.com/NanddoSalas"
          target="_blank"
          className="text-blue-600"
        >
          NanddoSalas
        </a>
      </p>
    </div>
  );
};
