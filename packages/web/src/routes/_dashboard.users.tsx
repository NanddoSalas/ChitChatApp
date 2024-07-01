import { createFileRoute } from '@tanstack/react-router';
import { UsersScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/_dashboard/users')({
  component: UsersScreen,
});
