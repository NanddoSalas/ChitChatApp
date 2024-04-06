import { Router } from 'express';
import { adminRoleRequired, authRequired } from '../middleware';
import authController from './auth.controller';
import invitationController from './invitation.controller';
import userController from './user.controller';

const router = Router();

router.use('/users', authController);

router.use('/users', authRequired, userController);

router.use(
  '/invitations',
  authRequired,
  adminRoleRequired,
  invitationController,
);

export default router;
