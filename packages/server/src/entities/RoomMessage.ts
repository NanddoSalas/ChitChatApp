import { Entity, ManyToOne } from 'typeorm';
import { Message } from './Message';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class RoomMessage extends Message {
  @ManyToOne(() => User, (user) => user.roomMessages)
  createdBy: Promise<User>;

  @ManyToOne(() => Room, (room) => room.messages)
  sendAt: Promise<Room>;
}
