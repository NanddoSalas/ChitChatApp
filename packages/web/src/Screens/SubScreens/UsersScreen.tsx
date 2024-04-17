import Breadcrumb from '../../componentes/Breadcrumbs';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { UsersTable } from '../../componentes/UsersTable';

const UsersScreen = () => {
  return (
    <SubScreenContainer>
      <Header start={<OpenDraweButton />} />

      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
        <Heading
          start={<Breadcrumb items={[{ name: 'Users', path: null }]} />}
        />

        <UsersTable />
      </div>
    </SubScreenContainer>
  );
};

export default UsersScreen;
