import { useQueryClient } from '@tanstack/react-query';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { DashboardScreen } from './DashboardScreen';

export const IndexScreen = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' });
      queryClient.clear();
      queryClient.getQueryCache().clear();
    }
  }, [isAuthenticated, navigate, queryClient]);

  if (isAuthenticated) {
    return <DashboardScreen />;
  }

  return <Outlet />;
};
