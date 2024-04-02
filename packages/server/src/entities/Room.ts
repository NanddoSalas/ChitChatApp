import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './Member';
import { RoomMessage } from './RoomMessage';
import { User } from './User';

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: String;

  @ManyToOne(() => User, (user) => user.createdRooms)
  owner: Promise<User>;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(() => RoomMessage, (roomMessage) => roomMessage.sendAt)
  messages: Promise<RoomMessage>;

  @OneToMany(() => Member, (member) => member.room)
  members: Promise<Member>;
}
