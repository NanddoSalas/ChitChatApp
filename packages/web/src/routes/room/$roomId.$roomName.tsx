import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router';
import { RoomChatScreen } from '../../screens/SubScreens/RoomChatScreen';

export const Route = createFileRoute('/room/$roomId/$roomName')({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const path = useLocation().pathname;

    if (path.split('/').length === 4) {
      return <RoomChatScreen />;
    }

    return <Outlet />;
  },
});
