import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const useAuthMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const { accessToken } = useContext(AuthContext);

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (form) => {
      try {
        const res = await axios.post(
          'http://localhost:8080' + options?.mutationKey,
          form,
          {
            validateStatus: (status) => {
              return status < 500;
            },
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
            },
          },
        );

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
