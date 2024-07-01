import { createFileRoute, redirect } from '@tanstack/react-router';
import { DashboardScreen } from '../screens/DashboardScreen';

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: '/welcome',
      });
    }
  },
  component: DashboardScreen,
});
