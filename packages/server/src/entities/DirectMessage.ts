import { Entity, ManyToOne } from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@Entity()
export class DirectMessage extends Message {
  @ManyToOne(() => User, (user) => user.directMessages)
  createdBy: Promise<User>;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  sendTo: Promise<User>;
}
