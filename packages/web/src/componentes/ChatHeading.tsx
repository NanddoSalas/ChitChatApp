import { RoomHeading } from './RoomHeading';
import { UserHeading } from './UserHeading';

interface ChatHeadingProps {
  target: 'user' | 'room';
  targetId: number;
}

export const ChatHeading: React.FC<ChatHeadingProps> = ({
  target,
  targetId,
}) => {
  if (target === 'user') return <UserHeading userId={targetId} />;

  return <RoomHeading roomId={targetId} />;
};
