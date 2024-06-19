import { createFileRoute } from '@tanstack/react-router';
import { InvitationsScreen } from '../screens/SubScreens';

export const Route = createFileRoute('/invitations')({
  component: InvitationsScreen,
});
