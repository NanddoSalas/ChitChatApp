import { createFileRoute } from '@tanstack/react-router';
import { SignInScreen } from '../screens/SignInScreen';

export const Route = createFileRoute('/signin')({
  component: SignInScreen,
});
