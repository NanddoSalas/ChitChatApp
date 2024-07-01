import { createFileRoute } from '@tanstack/react-router';
import { RoomsScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/_dashboard/rooms')({
  component: RoomsScreen,
});
