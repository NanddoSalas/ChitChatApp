import { Middleware } from '../types';
import { getUser } from '../utils';

export const authRequired: Middleware = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  const user = await getUser(accessToken || '');

  if (user) {
    req.user = user;

    next();
  } else {
    res.sendStatus(401);
  }
};
