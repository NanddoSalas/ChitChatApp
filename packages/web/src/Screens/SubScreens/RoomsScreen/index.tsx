import RoomsTable from '../../../componentes/RoomsTable';
import Heading from './Heading';

const RoomsScreen = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 h-full overflow-x-auto space-y-4 sm:space-y-6 lg:space-y-8">
      <Heading />

      <RoomsTable />
    </div>
  );
};

export default RoomsScreen;
