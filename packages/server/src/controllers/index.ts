import { Router } from 'express';
import { adminRoleRequired, authRequired } from '../middleware';
import { roomMemberRequiredIfPrivate } from '../middleware/roomMemberRequiredIfPrivate';
import authController from './auth.controller';
import invitationController from './invitation.controller';
import roomMessageController from './roomMessage.controller';
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

router.use(
  '/rooms/:id/messages',
  authRequired,
  roomMemberRequiredIfPrivate,
  roomMessageController,
);

export default router;
