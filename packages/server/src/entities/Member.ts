import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.memberOf)
  user: User;

  @ManyToOne(() => Room, (room) => room.members)
  room: Room;
}
