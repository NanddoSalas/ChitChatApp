import { StateCreator } from 'zustand';
import { Member } from '../types/resources';

interface Store {
  roomMembers: {
    [roomId: number]: {
      data: Member[] | null;
      fetching: false;
    };
  };
}

interface Actions {
  retrieveRoomMembers: (roomId: number) => void;
  addUserToRoom: (roomId: number, userId: number) => void;
  kickUserOutOfRoom: (memberId: number) => void;
}

export interface RoomMembersSlice extends Store, Actions {}

export const createRoomMembersSlice: StateCreator<RoomMembersSlice> = () => ({
  roomMembers: {},
  retrieveRoomMembers: () => {},
  addUserToRoom: () => {},
  kickUserOutOfRoom: () => {},
});
