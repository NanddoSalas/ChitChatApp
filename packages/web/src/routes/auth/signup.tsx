import { createFileRoute } from '@tanstack/react-router';
import { SignUpScreen } from '../../screens/auth/SignUpScreen';

export const Route = createFileRoute('/auth/signup')({
  component: SignUpScreen,
});
