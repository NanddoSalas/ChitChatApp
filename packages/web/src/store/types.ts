export type Role = 'ServerAdmin' | 'Admin' | 'Member';

export type User = {
  id: number;
  avatar: string;
  fullName: string;
  about: string;
  email: string;
  role: Role;
  joinedServer: Date;
};

export type Invitation = {
  id: number;
  inviteCode: string;
  limit: number;
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

export type NavigationPath =
  | '/'
  | '/account'
  | '/invitations'
  | '/users'
  | '/rooms'
  | '/users/:id'
  | '/rooms/:id'
  | '/rooms/:id/members';
