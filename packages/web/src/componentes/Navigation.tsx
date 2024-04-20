import {
  AccountScreen,
  HomeScreen,
  InvitationsScreen,
  RoomMembersScreen,
  RoomsScreen,
  UsersScreen,
} from '../Screens/SubScreens';
import { ChatScreen } from '../Screens/SubScreens/ChatScreen';
import { useStore } from '../store';

export const Navigation = () => {
  const navigation = useStore((state) => state.navigation);

  if (navigation.path === '/invitations') {
    return <InvitationsScreen />;
  }

  if (navigation.path === '/users') {
    return <UsersScreen />;
  }

  if (navigation.path === '/rooms') {
    return <RoomsScreen />;
  }

  if (navigation.path === '/rooms/:id') {
    return <ChatScreen />;
  }

  if (navigation.path === '/users/:id') {
    return <ChatScreen />;
  }

  if (navigation.path === '/account') {
    return <AccountScreen />;
  }

  if (navigation.path === '/rooms/:id/members') {
    return <RoomMembersScreen />;
  }

  return <HomeScreen />;
};
