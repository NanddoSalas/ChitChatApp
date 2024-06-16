import { useQueryClient } from '@tanstack/react-query';
import { User } from '../types/api/resources';

export const useGetUser = () => {
  const queryCache = useQueryClient().getQueryCache();

  const getUser = (userId: number) => {
    const users =
      queryCache.find<User[], Error>({ queryKey: ['/users'] })?.state.data ||
      [];

    return users.find((u) => u.id == userId)!;
  };

  return getUser;
};
