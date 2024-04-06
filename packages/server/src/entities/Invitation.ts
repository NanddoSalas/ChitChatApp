import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicInvitationData } from '../types';
import { User } from './User';

@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  createdById: number;

  @ManyToOne(() => User, (user) => user.generatedInvitations)
  createdBy: Promise<User>;

  @Column({ default: 0 })
  uses: number;

  @Column({ default: 0 })
  limit: number;

  getPublicData(): PublicInvitationData {
    return { id: this.id, code: this.code, limit: this.limit, uses: this.uses };
  }
}
