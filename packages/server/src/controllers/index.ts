import { Router } from 'express';
import { authRequired } from '../middleware';
import userController from './user.controller';

const router = Router();

router.use('/users', authRequired, userController);

export default router;
