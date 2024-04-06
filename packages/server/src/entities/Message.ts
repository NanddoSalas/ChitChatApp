import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: String;

  @CreateDateColumn()
  createdAt: Date;
}
