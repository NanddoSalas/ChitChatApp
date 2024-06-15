import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import { DashboardScreen } from './DashboardScreen';
import { WelcomeScreen } from './WelcomeScreen';

export const IndexScreen = () => {
  const { isAuthenticated, accessToken } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        queryFn: async ({ queryKey }) => {
          try {
            const res = await axios.get('http://localhost:8080' + queryKey, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (res.status === 200) {
              return res.data;
            }

            console.log(res);

            return { data: null, errors: null };
          } catch (error) {
            console.log(error);

            return { data: null, errors: null };
          }
        },
      },
    });
  }, [accessToken, queryClient]);

  if (isAuthenticated) {
    return <DashboardScreen />;
  }

  return <WelcomeScreen />;
};
