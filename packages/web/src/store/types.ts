export type Role = 'ServerAdmin' | 'Admin' | 'Member';

export type User = {
  id: number;
  avatar: string | null;
  fullName: string;
  email: string;
  role: Role;
  joinedServer: Date;
};

export type Invitation = {
  id: number;
  inviteCode: string;
  limit: number | null;
  uses: number;
  isRevoked: boolean;
  createdAt: Date;
};

export type Room = {
  id: number;
  name: string;
  adminId: number;
  createdAt: Date;
  isPrivate: boolean;
  haveAccess: boolean;
};

export type Member = {
  id: number;
  userId: number;
  memberSince: Date;
};

export type Message = {
  id: number;
  messageBody: string;
  sendAt: Date;
  sendById: number;
};

export type OAuthProvider = 'Google' | 'GitHub';
