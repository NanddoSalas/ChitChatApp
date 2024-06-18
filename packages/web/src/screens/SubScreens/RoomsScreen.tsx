import { PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import RoomsTable from '../../componentes/RoomsTable';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';

const RoomsScreen = () => {
  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">Rooms</span>}
        end={
          <button className="btn btn-square btn-neutral">
            <PlusIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        }
      />

      <SubScreenLayout>
        <Heading
          start={<Breadcrumb items={[{ name: 'Rooms', path: '' }]} />}
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
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default RoomsScreen;
