import jwt from 'jsonwebtoken';
import short from 'short-uuid';
import { Invitation, Member, Room, RoomMessage, User } from './entities';

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

export const addUserToRoom = (user: User, room: Room) => {
  const newMember = Member.create();

  newMember.room = Promise.resolve(room);
  newMember.user = Promise.resolve(user);

  return newMember.save();
};

export const createRoom = async (
  name: string,
  owner: User,
  isPrivate: boolean,
) => {
  const newRoom = Room.create();

  newRoom.isPrivate = isPrivate;
  newRoom.owner = Promise.resolve(owner);
  newRoom.name = name;

  await newRoom.save();

  await addUserToRoom(owner, newRoom);

  return newRoom;
};

export const sendMessageAtRoom = (
  user: User,
  room: Room,
  messageBody: string,
) => {
  const newRoomMessage = RoomMessage.create();

  newRoomMessage.body = messageBody;
  newRoomMessage.createdBy = Promise.resolve(user);
  newRoomMessage.sendAt = Promise.resolve(room);

  return newRoomMessage.save();
};
