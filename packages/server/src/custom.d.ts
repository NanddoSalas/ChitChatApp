import { User } from './entities';

declare global {
  declare namespace Express {
    export interface Request {
      user?: User;
      room?: Room;
    }
  }
}
