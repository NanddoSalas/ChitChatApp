import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import {
  DirectMessagesSlice,
  createDirectMessagesSlice,
} from './directMessages';
import { InvitationsSlice, createInvitationsSlice } from './invitations';
import { NavigationSlice, createNavigationSlice } from './navigation';
import { RoomMembersSlice, createRoomMembersSlice } from './roomMembers';
import { RoomMessagesSlice, createRoomMessagesSlice } from './roomMessages';
import { RoomsSlice, createRoomsSlice } from './rooms';
import { SearchBarSlice, createSearchBarSlice } from './searchBar';
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
    SearchBarSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUsersSlice(...a),
  ...createRoomsSlice(...a),
  ...createInvitationsSlice(...a),
  ...createRoomMembersSlice(...a),
  ...createRoomMessagesSlice(...a),
  ...createDirectMessagesSlice(...a),
  ...createNavigationSlice(...a),
  ...createSearchBarSlice(...a),
}));
