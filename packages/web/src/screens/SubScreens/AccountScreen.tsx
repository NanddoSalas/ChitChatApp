import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { ProfileSection } from '../../componentes/Sections/ProfileSection';
import { SocialLoginSection } from '../../componentes/Sections/SocialLoginSection';
import { UpdatePasswordSection } from '../../componentes/Sections/UpdatePasswordSection';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';

const AccountScreen = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const hasPassword = true;
  const hasGitHub = false;
  const hasGoogle = false;

  const handleProfileSave = (fullName: string, about: string) => {
    console.log(fullName);
    console.log(about);
  };

  const handleUpdatePassword = (password: string) => {
    console.log(password);
  };

  if (!user) navigate({ to: '/' });

  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">Account</span>}
        end={
          <button className="btn btn-square btn-neutral" onClick={signOut}>
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
                onClick={signOut}
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
          <ProfileSection
            about={user!.about}
            avatar={user!.avatar}
            email={user!.email}
            fullName={user!.fullName}
            onSave={handleProfileSave}
          />

          <UpdatePasswordSection
            onSave={handleUpdatePassword}
            hasPassword={hasPassword}
          />

          <SocialLoginSection
            hasGitHub={hasGitHub}
            hasGoogle={hasGoogle}
            hasPassword={hasPassword}
          />
        </div>
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default AccountScreen;
