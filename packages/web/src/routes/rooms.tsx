import { createFileRoute } from '@tanstack/react-router';
import { RoomsScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/rooms')({
  component: RoomsScreen,
});
