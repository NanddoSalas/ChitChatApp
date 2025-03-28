import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import {
  ProfileSection,
  SocialLoginSection,
  UpdatePasswordSection,
} from '../../componentes/AccountScreenSections';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';

const AccountScreen = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate({ to: '/welcome' });
  };

  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">Account</span>}
        end={
          <button
            className="btn btn-square btn-neutral"
            onClick={handleSignOut}
          >
            <ArrowLeftStartOnRectangleIcon
              className="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        }
      />

      <SubScreenLayout>
        <Heading
          start={<Breadcrumb items={[{ name: 'Account', path: '' }]} />}
          end={
            <div className="flex">
              <button
                className="btn btn-neutral  btn-sm lg:btn-md"
                onClick={handleSignOut}
              >
                <ArrowLeftStartOnRectangleIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
                Sign Out
              </button>
            </div>
          }
        />

        <div className="space-y-10 divide-y divide-gray-900/10 !mt-0">
          <ProfileSection />

          <UpdatePasswordSection />

          <SocialLoginSection />
        </div>
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default AccountScreen;
