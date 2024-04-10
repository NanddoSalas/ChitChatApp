import { StateCreator } from 'zustand';
import { Message } from './types';

interface Store {
  directMessages: {
    [userId: number]: {
      data: Message[] | null;
      fetching: boolean;
      unreadMessagesCount: number;
      cursor: number;
    };
  };
}

interface Actions {
  retrieveDirectMessages: (userId: number) => void;
  retrieveMoreDirectMessages: (userId: number) => void;
  sendDirectMessage: (messageBody: string, userId: number) => void;
}

export interface DirectMessagesSlice extends Store, Actions {}

export const createDirectMessagesSlice: StateCreator<
  DirectMessagesSlice
> = () => ({
  directMessages: {},
  retrieveDirectMessages: () => {},
  retrieveMoreDirectMessages: () => {},
  sendDirectMessage: () => {},
});
