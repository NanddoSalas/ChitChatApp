import { StateCreator } from 'zustand';
import { Invitation } from '../types/resources';

interface Store {
  invitations: {
    data: Invitation[] | null;
    fetching: boolean;
  };
}

interface Actions {
  retrieveInvitations: () => void;
  createInvitation: () => void;
  revokeInvitation: (invitationId: number) => void;
}

export interface InvitationsSlice extends Store, Actions {}

export const createInvitationsSlice: StateCreator<InvitationsSlice> = () => ({
  invitations: { data: null, fetching: false },
  retrieveInvitations: () => {},
  createInvitation: () => {},
  revokeInvitation: () => {},
});
