import { Middleware } from '../types';

export const AdminRoleRequired: Middleware = (req, res, next) => {
  const role = req.user?.role;

  if (role === 'Admin' || role === 'ServerAdmin') next();
  else res.sendStatus(401);
};
