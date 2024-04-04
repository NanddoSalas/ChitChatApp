export interface PublicUserData {
  id: number;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}

export type UserRoles = 'Basic' | 'Admin' | 'ServerAdmin';
