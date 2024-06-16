import { useQueryClient } from '@tanstack/react-query';
import { Room } from '../types/api/resources';

export const useGetRoom = () => {
  const queryCache = useQueryClient().getQueryCache();

  const getRoom = (roomId: number) => {
    const rooms =
      queryCache.find<Room[], Error>({ queryKey: ['/rooms'] })?.state.data ||
      [];

    return rooms.find((r) => r.id == roomId)!;
  };

  return getRoom;
};
