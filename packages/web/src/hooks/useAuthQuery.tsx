import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const useAuthQuery = <TQueryFnData, TError, TData = TQueryFnData>(
  options: UseQueryOptions<TQueryFnData, TError, TData>,
) => {
  const { accessToken } = useContext(AuthContext);

  return useQuery<TQueryFnData, TError, TData>({
    queryFn: async ({ queryKey }) => {
      try {
        const res = await axios.get('http://localhost:8080' + queryKey, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
          validateStatus: (status) => {
            return status < 500;
          },
        });

        if (res.status === 200) {
          return res.data.data;
        }

        if (res.status === 400) {
          return Promise.reject(res.data.errors);
        }

        console.log(res);

        return Promise.reject(null);
      } catch (error) {
        console.log(error);

        return Promise.reject(null);
      }
    },
    ...options,
  });
};
