import { Router } from 'express';
import { authRequired } from '../middleware';
import authController from './auth.controller';
import userController from './user.controller';

const router = Router();

router.use('/users', authController);

router.use('/users', authRequired, userController);

export default router;
