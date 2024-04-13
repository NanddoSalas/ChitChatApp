import { ProfileSection } from '../../../componentes/Sections/ProfileSection';
import { UpdatePasswordSection } from '../../../componentes/Sections/UpdatePasswordSection';
import { useStore } from '../../../store';
import Heading from './Heading';

const AccountScreen = () => {
  const auth = useStore((state) => state.auth);
  const user = auth.user!;
  const { password: hasPassword } = auth.authMethods!;

  const handleProfileSave = (fullName: string, about: string) => {
    console.log(fullName);
    console.log(about);
  };

  const handleUpdatePassword = (password: string) => {
    console.log(password);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 h-full overflow-x-auto space-y-4 sm:space-y-6 lg:space-y-8">
      <Heading />

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
      </div>
    </div>
  );
};

export default AccountScreen;
