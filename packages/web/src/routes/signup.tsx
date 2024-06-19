import { createFileRoute } from '@tanstack/react-router';
import { SignUpScreen } from '../screens/SignUpScreen';

export const Route = createFileRoute('/signup')({
  component: SignUpScreen,
});
