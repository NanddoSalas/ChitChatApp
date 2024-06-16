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
      <Header start={<OpenDraweButton />} />

      <SubScreenLayout>
        <Heading
          start={<Breadcrumb items={[{ name: 'Users', path: null }]} />}
        />

        <UsersTable />
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default UsersScreen;
