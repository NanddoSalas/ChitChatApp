import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import {
  CommandPaletteSlice,
  createCommandPaletteSlice,
} from './commandPalette';
import {
  DirectMessagesSlice,
  createDirectMessagesSlice,
} from './directMessages';
import { InvitationsSlice, createInvitationsSlice } from './invitations';
import { NavigationSlice, createNavigationSlice } from './navigation';
import { RoomMembersSlice, createRoomMembersSlice } from './roomMembers';
import { RoomMessagesSlice, createRoomMessagesSlice } from './roomMessages';
import { RoomsSlice, createRoomsSlice } from './rooms';
import { UsersSlice, createUsersSlice } from './users';

export const useStore = create<
  AuthSlice &
    UsersSlice &
    RoomsSlice &
    InvitationsSlice &
    RoomMembersSlice &
    RoomMessagesSlice &
    DirectMessagesSlice &
    NavigationSlice &
    CommandPaletteSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUsersSlice(...a),
  ...createRoomsSlice(...a),
  ...createInvitationsSlice(...a),
  ...createRoomMembersSlice(...a),
  ...createRoomMessagesSlice(...a),
  ...createDirectMessagesSlice(...a),
  ...createNavigationSlice(...a),
  ...createCommandPaletteSlice(...a),
}));
