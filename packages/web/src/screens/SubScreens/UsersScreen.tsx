import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';
import { UsersTable } from '../../componentes/UsersTable';

const UsersScreen = () => {
  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">Users</span>}
        end={<></>}
      />

      <SubScreenLayout>
        <Heading start={<Breadcrumb items={[{ name: 'Users', path: '' }]} />} />

        <UsersTable />
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default UsersScreen;
