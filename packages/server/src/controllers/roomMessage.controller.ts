import { Router } from 'express';
import { RoomMessage } from '../entities';
import { PublicMessageData } from '../types';

const router = Router();

// retrieve all messages in a room
router.get('/', async (req, res) => {
  const cursor = req.body.cursor;

  const query = RoomMessage.createQueryBuilder('roomMessage').where(
    'roomMessage.sendAtId = :sendAtId',
    { sendAtId: req.room.id },
  );

  if (cursor) query.andWhere('roomMessage.id < :cursor', { cursor });

  query.orderBy('roomMessage.id', 'DESC').take(20);

  const messages = (await query.getMany()).map<PublicMessageData>((m) =>
    m.getMessagePublicData(),
  );

  res.status(200).send({ messages, cursor: messages[messages.length - 1]?.id });
});

// send message in a room
router.post('/', async (req, res) => {
  if (!req.body.message) {
    res.sendStatus(400);
    return;
  }

  const newMessage = RoomMessage.create({ body: req.body.message });
  newMessage.createdBy = Promise.resolve(req.user!);
  newMessage.sendAt = Promise.resolve(req.room);
  await newMessage.save();

  res.sendStatus(200);
});

export default router;
