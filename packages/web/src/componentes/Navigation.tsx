import AccountScreen from '../Screens/SubScreens/AccountScreen';
import { HomeScreen } from '../Screens/SubScreens/HomeScreen';
import RoomsScreen from '../Screens/SubScreens/RoomsScreen';
import UsersScreen from '../Screens/SubScreens/UsersScreen';
import { useStore } from '../store';

export const Navigation = () => {
  const navigation = useStore((state) => state.navigation);

  // if (navigation.path === '/invitations') {
  //   return <InvitationsScreen />;
  // }

  if (navigation.path === '/users') {
    return <UsersScreen />;
  }

  if (navigation.path === '/rooms') {
    return <RoomsScreen />;
  }

  // if (navigation.path === '/rooms/:id') {
  //   return <Chat />;
  // }

  // if (navigation.path === '/users/:id') {
  //   return <Chat />;
  // }

  if (navigation.path === '/account') {
    return <AccountScreen />;
  }

  // if (navigation.path === '/rooms/:id/members') {
  //   return <RoomMembersScreen />;
  // }

  return <HomeScreen />;
};
