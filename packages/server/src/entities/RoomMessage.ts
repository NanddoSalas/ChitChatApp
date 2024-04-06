import { Column, Entity, ManyToOne } from 'typeorm';
import { PublicMessageData } from '../types';
import { Message } from './Message';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class RoomMessage extends Message {
  @Column()
  createdById: number;

  @Column()
  sendAtId: number;

  @ManyToOne(() => User, (user) => user.roomMessages)
  createdBy: Promise<User>;

  @ManyToOne(() => Room, (room) => room.messages)
  sendAt: Promise<Room>;

  getMessagePublicData(): PublicMessageData {
    return {
      id: this.id,
      body: this.body,
      createdAt: this.createdAt.toISOString(),
      createdById: this.createdById,
    };
  }
}
