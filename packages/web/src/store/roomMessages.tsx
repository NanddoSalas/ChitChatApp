import { StateCreator } from 'zustand';
import { Message } from './types';

interface Store {
  roomMessages: {
    [roomId: number]: {
      data: Message[] | null;
      fetching: boolean;
      unreadMessagesCount: number;
      cursos: number;
    };
  };
}

interface Actions {
  retrieveRoomMessages: (roomid: number) => void;
  retrieveMoreRoomMessages: (roomId: number) => void;
  sendRoomMessage: (messageBody: string, roomId: number) => void;
  touchRoom: (roomId: number) => void;
}

export interface RoomMessagesSlice extends Store, Actions {}

export const createRoomMessagesSlice: StateCreator<RoomMessagesSlice> = () => ({
  roomMessages: {},
  retrieveRoomMessages: () => {},
  retrieveMoreRoomMessages: () => {},
  sendRoomMessage: () => {},
  touchRoom: () => {},
});
