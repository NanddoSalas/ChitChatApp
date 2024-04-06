import { Router } from 'express';
import { User } from '../entities';
import { validateSchema } from '../middleware';
import { updateUserSchema } from '../schemas/updateUserSchema';
import { PublicUserData } from '../types';

const router = Router();

// retrieve all users
router.get('/', async (_req, res) => {
  const users = await User.find();

  if (users.length > 0) {
    res.send({
      users: users.map<PublicUserData>((u) => u.getPublicUserData()),
    });
  } else {
    res.send({ users: [] });
  }
});

// retrieve user by id
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await User.findOne({ where: { id: userId } });

  if (user) {
    res.status(200).send(user.getPublicUserData());
  } else {
    res.sendStatus(404);
  }
});

// update user
router.put('/:id', validateSchema(updateUserSchema), async (req, res) => {
  const userId = parseInt(req.params.id);
  const { user, body } = req;

  if (req.user!.id !== userId) res.sendStatus(401);
  else {
    user!.name = body.name;
    user!.email = body.email;

    await user!.save();

    res.sendStatus(200);
  }
});

// update user's role
router.put('/:id/role', async (req, res) => {
  if (req.user!.role === 'ServerAdmin') {
    const newRole = req.body.role;
    const userId = parseInt(req.params.id);

    if (newRole !== 'Admin' && newRole !== 'Basic') {
      res.status(400).send({ role: "Role must be 'Basic' or 'Admin'" });
      return;
    }

    const user = await User.findOneBy({ id: userId });

    if (user!.role === newRole) {
      res.sendStatus(200);
    } else {
      user!.role = newRole;
      await user!.save();

      res.sendStatus(200);
    }
  } else {
    res.sendStatus(401);
  }
});

export default router;
