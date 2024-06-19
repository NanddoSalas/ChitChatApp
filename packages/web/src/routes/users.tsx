import { createFileRoute } from '@tanstack/react-router';
import { UsersScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/users')({
  component: UsersScreen,
});
