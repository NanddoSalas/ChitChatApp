import PlusIcon from '@heroicons/react/20/solid/PlusIcon';
import { useParams } from '@tanstack/react-router';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';
import RoomMembersTable from '../../componentes/Tables/RoomMembersTable';

const RoomMembersScreen = () => {
  const { roomName } = useParams({
    from: '/_dashboard/room/$roomId/$roomName/members',
  });

  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={
          <span className="text-white font-semibold">{roomName}'s Members</span>
        }
        end={
          <button className="btn btn-square btn-neutral">
            <PlusIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        }
      />

      <SubScreenLayout>
        <Heading
          start={
            <Breadcrumb
              items={[
                { name: 'Rooms', path: '/rooms' },
                {
                  name: roomName.split('-').join(' '),
                  path: '',
                },
                { name: 'Members', path: '' },
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
