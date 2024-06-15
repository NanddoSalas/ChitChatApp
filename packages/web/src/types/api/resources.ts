export interface Res<D = unknown, E = unknown> {
  data: D | null;
  errors: E | null;
}

export interface User {
  id: number;
  fullName: string;
  email: string;
  avatar: string;
  about: string;
  role: string;
  creationDate: string;
}
export interface Invitation {
  id: number;
  inviteCode: string;
  uses: number;
  maxUses: number;
  revoked: boolean;
  creatioDate: string;
}

export interface Room {
  id: number;
  roomName: string;
  creatorId: number;
  creationDate: string;
  hasAccess: boolean;
  private: boolean;
}
export interface Member {
  userId: number;
  memberSince: string;
}

export interface Message {
  id: number;
  senderId: number;
  creationDate: string;
  body: string;
}
