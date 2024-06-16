import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { IndexScreen } from './screens/IndexScreen';
import { SignInScreen } from './screens/SignInScreen';
import { SignUpScreen } from './screens/SignUpScreen';
import {
  AccountScreen,
  InvitationsScreen,
  RoomMembersScreen,
  RoomsScreen,
  UsersScreen,
} from './screens/SubScreens';
import { RoomChatScreen } from './screens/SubScreens/RoomChatScreen';
import { UserChatScreen } from './screens/SubScreens/UserChatScreen';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexScreen,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignInScreen,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: SignUpScreen,
});

const accountRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/account',
  component: AccountScreen,
});

const invitationsRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/invitations',
  component: InvitationsScreen,
});

const usersRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/users',
  component: UsersScreen,
});

const roomsRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/rooms',
  component: RoomsScreen,
});

const roomMemberRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/rooms/$roomId/members',
  component: RoomMembersScreen,
});

const roomChatRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/rooms/$roomId',
  component: RoomChatScreen,
});

const userChatRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: '/users/$userId',
  component: UserChatScreen,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  signUpRoute,
  accountRoute,
  invitationsRoute,
  usersRoute,
  roomsRoute,
  roomMemberRoute,
  roomChatRoute,
  userChatRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

export const Router = () => {
  return <RouterProvider router={router} />;
};
