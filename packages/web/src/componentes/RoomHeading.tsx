import { useStore } from '../store';
import { Heading } from './Heading';

interface RoomHeadingProps {
  roomId: number;
}

export const RoomHeading: React.FC<RoomHeadingProps> = ({ roomId }) => {
  const getRoom = useStore((state) => state.getRoom);
  const room = getRoom(roomId)!;

  return <Heading center={room.name} />;
};
