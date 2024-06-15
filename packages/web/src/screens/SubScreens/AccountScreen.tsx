import Breadcrumb from '../../componentes/Breadcrumbs';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { ProfileSection } from '../../componentes/Sections/ProfileSection';
import { SocialLoginSection } from '../../componentes/Sections/SocialLoginSection';
import { UpdatePasswordSection } from '../../componentes/Sections/UpdatePasswordSection';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';
import { useStore } from '../../store';

const AccountScreen = () => {
  const auth = useStore((state) => state.auth);
  const user = auth.user!;
  const {
    password: hasPassword,
    github: hasGitHub,
    google: hasGoogle,
  } = auth.authMethods!;

  const handleProfileSave = (fullName: string, about: string) => {
    console.log(fullName);
    console.log(about);
  };

  const handleUpdatePassword = (password: string) => {
    console.log(password);
  };

  return (
    <SubScreenContainer>
      <Header start={<OpenDraweButton />} />

      <SubScreenLayout>
        <Heading
          start={<Breadcrumb items={[{ name: 'Account', path: null }]} />}
        />

        <div className="space-y-10 divide-y divide-gray-900/10 !mt-0">
          <ProfileSection
            about={user.about}
            avatar={user.avatar}
            email={user.email}
            fullName={user.fullName}
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
