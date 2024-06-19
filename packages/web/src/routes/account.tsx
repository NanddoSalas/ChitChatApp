import { createFileRoute } from '@tanstack/react-router';
import { AccountScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/account')({
  component: AccountScreen,
});
