import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Message } from '../types/api/resources';

export const useInfiniteMessagesQuery = (
  target: 'room' | 'user',
  targetId: number | string,
) => {
  const { accessToken } = useContext(AuthContext);

  return useInfiniteQuery<Message[], null>({
    queryKey: [`/${target}s/${targetId}/messages`],
    queryFn: async ({ pageParam, queryKey }) => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + queryKey, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
          validateStatus: (status) => {
            return status < 500;
          },
          params: { cursor: pageParam },
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
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
  });
};
