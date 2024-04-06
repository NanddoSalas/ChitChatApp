import express from 'express';

export interface PublicUserData {
  id: number;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}

export interface PublicInvitationData {
  id: number;
  code: string;
  uses: number;
  limit: number;
}

export type UserRole = 'Basic' | 'Admin' | 'ServerAdmin';

export type Middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => void;

export type RequestHandler = (
  req: express.Request,
  res: express.Response,
) => void;

export interface RetrieveUsersResponseData {
  users: PublicUserData[];
}

export type UpdateUserRequestData = {
  name: string;
  email: string;
};

export type UpdateUserRoleRequestData = {
  role: UserRole;
};
