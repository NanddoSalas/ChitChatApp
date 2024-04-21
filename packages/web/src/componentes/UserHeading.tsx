import { useStore } from '../store';
import { Heading } from './Heading';

interface UserHeadingProps {
  userId: number;
}

export const UserHeading: React.FC<UserHeadingProps> = ({ userId }) => {
  const getUser = useStore((state) => state.getUser);
  const user = getUser(userId)!;

  return <Heading center={user.fullName} />;
};
