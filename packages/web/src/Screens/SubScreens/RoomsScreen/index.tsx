import { OpenDraweButton } from '../../../componentes/Drawer';
import { Header } from '../../../componentes/Header';
import RoomsTable from '../../../componentes/RoomsTable';
import { Heading } from './Heading';

const RoomsScreen = () => {
  return (
    <>
      <Header start={<OpenDraweButton />} />

      <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
        <Heading />

        <RoomsTable />
      </div>
    </>
  );
};

export default RoomsScreen;
