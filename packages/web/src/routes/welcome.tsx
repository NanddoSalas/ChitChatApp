import { createFileRoute } from '@tanstack/react-router';
import { WelcomeScreen } from '../screens/WelcomeScreen';

export const Route = createFileRoute('/welcome')({
  component: WelcomeScreen,
});
