import { createFileRoute } from '@tanstack/react-router';
import { RoomMembersScreen } from '../../screens/SubScreens';

export const Route = createFileRoute('/_dashboard/room/$roomId/$roomName/members')({
  component: RoomMembersScreen,
});
