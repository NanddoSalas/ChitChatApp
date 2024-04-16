import { OpenDraweButton } from '../../../componentes/Drawer';
import { Header } from '../../../componentes/Header';
import { UsersTable } from '../../../componentes/UsersTable';
import { Heading } from './Heading';

const UsersScreen = () => {
  return (
    <>
      <Header start={<OpenDraweButton />} />

      <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
        <Heading />

        <UsersTable />
      </div>
    </>
  );
};

export default UsersScreen;
