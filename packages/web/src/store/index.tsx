import { create } from 'zustand';
import { AuthSlice, createAuthSlice } from './auth';
import {
  DirectMessagesSlice,
  createDirectMessagesSlice,
} from './directMessages';
import { InvitationsSlice, createInvitationsSlice } from './invitations';
import { RoomMembersSlice, createRoomMembersSlice } from './roomMembers';
import { RoomMessagesSlice, createRoomMessagesSlice } from './roomMessages';
import { RoomsSlice, createRoomsSlice } from './rooms';
import { UsersSlice, createUsersSlice } from './users';

export const createStore = create<
  AuthSlice &
    UsersSlice &
    RoomsSlice &
    InvitationsSlice &
    RoomMembersSlice &
    RoomMessagesSlice &
    DirectMessagesSlice
>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUsersSlice(...a),
  ...createRoomsSlice(...a),
  ...createInvitationsSlice(...a),
  ...createRoomMembersSlice(...a),
  ...createRoomMessagesSlice(...a),
  ...createDirectMessagesSlice(...a),
}));
