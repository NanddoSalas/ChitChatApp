import { PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../componentes/Breadcrumbs';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import RoomsTable from '../../componentes/RoomsTable';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';

const RoomsScreen = () => {
  return (
    <SubScreenContainer>
      <Header start={<OpenDraweButton />} />

      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
        <Heading
          start={<Breadcrumb items={[{ name: 'Rooms', path: null }]} />}
          end={
            <div className="flex">
              <button className="btn btn-neutral btn-sm lg:btn-md">
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                Create Room
              </button>
            </div>
          }
        />

        <RoomsTable />
      </div>
    </SubScreenContainer>
  );
};

export default RoomsScreen;
