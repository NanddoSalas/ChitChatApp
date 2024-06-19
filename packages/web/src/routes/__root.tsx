/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet, createRootRoute, useNavigate } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { DashboardScreen } from '../screens/DashboardScreen';

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!isAuthenticated) {
        navigate({ to: '/welcome' });
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return <Outlet />;

    return <DashboardScreen />;
  },
});
