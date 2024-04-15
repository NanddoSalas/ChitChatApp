import { UsersTable } from '../../../componentes/UsersTable';
import { Heading } from './Heading';

const UsersScreen = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 h-full overflow-x-auto space-y-4 sm:space-y-6 lg:space-y-8">
      <Heading />

      <UsersTable />
    </div>
  );
};

export default UsersScreen;
