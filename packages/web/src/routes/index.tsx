import { createFileRoute } from '@tanstack/react-router';
import { HomeScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/')({
  component: HomeScreen,
});
