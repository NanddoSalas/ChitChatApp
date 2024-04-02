import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DirectMessage } from './DirectMessage';
import { Invitation } from './Invitation';
import { Member } from './Member';
import { Room } from './Room';
import { RoomMessage } from './RoomMessage';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: String;

  @Column()
  displayName: String;

  @Column()
  avatar: String;

  @Column()
  role: String;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column()
  googleId: String;

  @Column()
  twitterId: String;

  @Column()
  githubId: String;

  @OneToMany(() => Room, (room) => room.owner)
  createdRooms: Promise<Room>;

  @OneToMany(() => Member, (member) => member.user)
  memberOf: Promise<Member>;

  @OneToMany(() => Invitation, (invitation) => invitation.createdBy)
  generatedInvitations: Promise<Invitation>;

  @OneToMany(() => RoomMessage, (roomMessage) => roomMessage.createdBy)
  roomMessages: Promise<RoomMessage>;

  @OneToMany(() => DirectMessage, (directMessage) => directMessage.createdBy)
  directMessages: Promise<DirectMessage>;

  @OneToMany(() => DirectMessage, (directMessage) => directMessage.sendTo)
  receivedMessages: Promise<DirectMessage>;
}
