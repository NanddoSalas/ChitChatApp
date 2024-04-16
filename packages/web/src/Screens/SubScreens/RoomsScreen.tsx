import { PlusIcon } from '@heroicons/react/20/solid';
import Breadcrumb from '../../componentes/Breadcrumbs';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import RoomsTable from '../../componentes/RoomsTable';

const RoomsScreen = () => {
  return (
    <>
      <Header start={<OpenDraweButton />} />

      <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 space-y-4 sm:space-y-6 lg:space-y-8 flex-1">
        <Heading
          start={<Breadcrumb items={[{ name: 'Rooms', path: null }]} />}
          end={
            <div className="flex">
              <button
                type="button"
                className="rounded-md bg-gray-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                <span className="flex space-x-1">
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />

                  <span>Create Room</span>
                </span>
              </button>
            </div>
          }
        />

        <RoomsTable />
      </div>
    </>
  );
};

export default RoomsScreen;
