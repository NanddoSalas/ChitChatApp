import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PublicMessageData } from '../types';

export abstract class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: String;

  @CreateDateColumn()
  createdAt: Date;

  getMessagePublicData(): PublicMessageData {
    return {
      id: this.id,
      body: this.body,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
