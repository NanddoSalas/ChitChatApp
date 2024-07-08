import { Message, Room, User } from '../api/resources';

export interface NewUserPayload {
  user: User;
}

export interface UpdateUserPayload {
  userId: number;
  fullName: string;
  about: string;
}

export interface UpdateRolePayload {
  role: string;
  accessToken: string;
}

export interface NewRoomPayload {
  room: Room;
}

export interface UpdateRoomPayload {
  roomId: number;
  roomName: string;
  isPrivate: boolean;
}

export interface DeleteRoomPayload {
  roomId: number;
}

export interface NewRoomMessagePayload {
  roomId: number;
  message: Message;
}

export interface NewDirectMessagePayload {
  message: Message;
}

export interface NewRoomMemberPayload {
  roomId: number;
}

export interface DeleteRoomMemberPayload {
  roomId: number;
}
