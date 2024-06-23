import { Outlet, createFileRoute } from '@tanstack/react-router';
import { RoomChatScreen } from '../../screens/SubScreens/RoomChatScreen';

export const Route = createFileRoute('/room/$roomId/$roomName')({
  component: () => {
    if (Outlet) return <Outlet />;

    return <RoomChatScreen />;
  },
});
