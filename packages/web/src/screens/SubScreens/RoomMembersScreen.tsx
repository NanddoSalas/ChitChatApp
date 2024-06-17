import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import RoomMembersTable from '../../componentes/RoomMembersTable';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';

const RoomMembersScreen = () => {
  return (
    <SubScreenContainer>
      <Header start={<OpenDraweButton />} />

      <SubScreenLayout>
        <Heading
          start={
            <Breadcrumb
              items={[
                { name: 'Rooms', path: '/rooms' },
                { name: 'Some Room Name', path: '' },
              ]}
            />
          }
          end={
            <div className="flex">
              <button className="btn btn-neutral btn-sm lg:btn-md">
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                Add Member
              </button>
            </div>
          }
        />

        <RoomMembersTable />
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default RoomMembersScreen;
