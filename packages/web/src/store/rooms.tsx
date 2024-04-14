import { StateCreator } from 'zustand';
import { Room } from '../types/resources';

interface Store {
  rooms: {
    data: Room[] | null;
    fetching: boolean;
  };
}

interface Actions {
  retrieveRooms: () => void;
  createRoom: (name: string, makeItPrivate: boolean, members: number[]) => void;
  deleteRoom: (roomId: number) => void;
  makeRoomPublic: (roomId: number) => void;
  makeRoomPrivate: (roomId: number) => void;
}

export interface RoomsSlice extends Store, Actions {}

export const createRoomsSlice: StateCreator<RoomsSlice> = () => ({
  rooms: { data: null, fetching: false },
  retrieveRooms: () => {},
  createRoom: () => {},
  deleteRoom: () => {},
  makeRoomPublic: () => {},
  makeRoomPrivate: () => {},
});
