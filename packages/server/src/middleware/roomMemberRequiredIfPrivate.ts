import { Member, Room } from '../entities';
import { Middleware } from '../types';

export const roomMemberRequiredIfPrivate: Middleware = async (
  req,
  res,
  next,
) => {
  const room = await Room.findOneBy({ id: parseInt(req.params.id) });

  if (!room) {
    res.sendStatus(400);
    return;
  }

  if (!room.isPrivate) {
    req.room = room;
    next();
    return;
  }

  const member = await Member.findOneBy({
    userId: req.user!.id,
    roomId: room.id,
  });

  if (!member) {
    res.sendStatus(401);
    return;
  }

  req.room = room;
  next();
};
