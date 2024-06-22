import {
  DefaultError,
  UseMutationOptions,
  useMutation,
} from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

type Method = 'post' | 'put' | 'patch ' | 'delete';

export const useAuthMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  method: Method = 'post',
) => {
  const { accessToken } = useContext(AuthContext);

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (form) => {
      try {
        let res: AxiosResponse;
        const url = 'http://localhost:8080' + options?.mutationKey;
        const config: AxiosRequestConfig = {
          validateStatus: (status) => {
            return status < 500;
          },
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        };

        if (method === 'delete') {
          res = await axios.delete(url, config);
        } else if (method === 'put') {
          res = await axios.put(url, form, config);
        } else if (method === 'patch ') {
          res = await axios.patch(url, form, config);
        } else {
          res = await axios.post(url, form, config);
        }

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
