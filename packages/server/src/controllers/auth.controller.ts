import { Router } from 'express';
import { Invitation, User } from '../entities';
import { validateSchema } from '../middleware';
import { loginSchema } from '../schemas/loginSchema';
import { registerSchema } from '../schemas/registerSchema';
import { createAccesToken } from '../utils';

const router = Router();

// register
router.post('/register', validateSchema(registerSchema), async (req, res) => {
  const { invitation: code, password, ...userData } = req.body;
  const user = await User.findOneBy({ email: userData.email });

  if (user) {
    res.status(400).send({ email: 'email already in use' });
    return;
  }

  const invitation = await Invitation.findOneBy({ code });

  if (!invitation || invitation.uses >= invitation.limit) {
    res.status(400).send({ invitation: 'invalid invitation code' });
    return;
  }

  invitation.uses++;
  invitation.limit--;

  await invitation.save();

  await User.create({ ...userData })
    .setPassword(password)
    .save();

  res.sendStatus(200);
});

// login
router.post('/login', validateSchema(loginSchema), async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOneBy({ email });

  if (!user) {
    res.status(400).send({ message: 'invalid credentials' });
    return;
  }

  if (!user.validatePassword(password)) {
    res.status(400).send({ message: 'invalid credentials' });
    return;
  }

  res.status(200).send({
    user: user.getPublicUserData(),
    accessToken: await createAccesToken(user),
  });
});

export default router;
