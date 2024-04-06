import jwt from 'jsonwebtoken';
import short from 'short-uuid';
import { Invitation, User } from './entities';

export const createAccesToken = async (user: User) => {
  const payload = {
    userId: user.id,
  };

  return jwt.sign(payload, process.env.SECRET_KEY || 'SECRET_KEY');
};

export const getUser = async (accessToken: string) => {
  try {
    const payload = jwt.verify(
      accessToken,
      process.env.SECRET_KEY || 'SECRET_KEY',
    );
    const user = await User.findOne({
      where: { id: (payload as any).userId },
    });

    return user;
  } catch (err) {
    return undefined;
  }
};

export const createInvitation = (user: User) => {
  const newInvitation = Invitation.create();

  newInvitation.code = short.generate();
  newInvitation.createdBy = Promise.resolve(user);
  newInvitation.limit = 5;

  return newInvitation.save();
};
