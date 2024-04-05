export interface PublicUserData {
  id: number;
  name: string;
  role: string;
  email: string;
  createdAt: string;
}

export type UserRole = 'Basic' | 'Admin' | 'ServerAdmin';

export type Middleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => void;
