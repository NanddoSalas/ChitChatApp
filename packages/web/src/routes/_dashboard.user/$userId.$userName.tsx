import { createFileRoute } from '@tanstack/react-router';
import { UserChatScreen } from '../../screens/SubScreens/UserChatScreen';

export const Route = createFileRoute('/_dashboard/user/$userId/$userName')({
  component: UserChatScreen,
});
