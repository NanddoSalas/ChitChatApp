import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => User, (user) => user.generatedInvitations)
  createdBy: Promise<User>;

  @Column({ default: 0 })
  uses: number;

  @Column({ default: 0 })
  limit: number;

  @Column()
  expireDate: Date;
}
