import bcrypt from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicUserData, UserRole } from '../types';
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
  name: string;

  @Column({ default: 'Basic' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: string;

  @Column()
  password: string;

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

  setPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(password, salt);

    return this;
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  getPublicUserData(): PublicUserData {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      role: this.role,
    };
  }
}
