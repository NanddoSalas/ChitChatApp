import { PlusIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import Breadcrumb from '../../componentes/Breadcrumb';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { GenerateInvitationModal } from '../../componentes/Modals/GenerateInvitationModal';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';
import InvitationsTable from '../../componentes/Tables/InvitationsTable';

const InvitationsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SubScreenContainer>
      <GenerateInvitationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">Invitations</span>}
        end={
          <button
            className="btn btn-square btn-neutral"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        }
      />

      <SubScreenLayout>
        <Heading
          start={<Breadcrumb items={[{ name: 'Invitations', path: '' }]} />}
          end={
            <div className="flex">
              <button
                className="btn btn-neutral  btn-sm lg:btn-md"
                onClick={() => setIsOpen(true)}
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                Generate Invite Code
              </button>
            </div>
          }
        />

        <InvitationsTable />
      </SubScreenLayout>
    </SubScreenContainer>
  );
};

export default InvitationsScreen;
