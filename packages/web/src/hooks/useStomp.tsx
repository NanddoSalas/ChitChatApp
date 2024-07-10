import { Client } from '@stomp/stompjs';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import {
  DeleteRoomDestination,
  DeleteRoomMemberDestination,
  NewDirectMessageDestination,
  NewPrivateRoomMessageDestination,
  NewRoomDestination,
  NewRoomMemberDestination,
  NewRoomMessageDestination,
  NewUserDestination,
  UpdateRoleDestination,
  UpdateRoomDestination,
  UpdateUserDestination,
} from '../stomp/destinations';
import { Message, Room, User } from '../types/api/resources';
import {
  DeleteRoomMemberPayload,
  DeleteRoomPayload,
  NewDirectMessagePayload,
  NewRoomMemberPayload,
  NewRoomMessagePayload,
  NewRoomPayload,
  NewUserPayload,
  UpdateRolePayload,
  UpdateRoomPayload,
  UpdateUserPayload,
} from '../types/stomp/payloads';

export const useStomp = () => {
  const { user: me, setUser, setAccessToken } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { accessToken } = useContext(AuthContext);
  const [client] = useState(
    new Client({
      brokerURL: import.meta.env.VITE_STOMP_URL,
      onStompError: (frame) => console.log(frame),
      onWebSocketError: (frame) => console.log(frame),
      onConnect: () => {
        client.subscribe(NewUserDestination, (message) => {
          const { user }: NewUserPayload = JSON.parse(message.body);

          queryClient.setQueryData<User[]>(['/users'], (oldData) => {
            if (oldData) {
              return [...oldData, user];
            }
          });
        });

        client.subscribe(UpdateUserDestination, (message) => {
          const { about, fullName, userId }: UpdateUserPayload = JSON.parse(
            message.body,
          );

          queryClient.setQueryData<User[]>(['/users'], (oldData) => {
            if (oldData) {
              return oldData.map((user) =>
                user.id === userId ? { ...user, fullName, about } : user,
              );
            }
          });
        });

        client.subscribe(NewRoomDestination, (message) => {
          const { room }: NewRoomPayload = JSON.parse(message.body);

          if (room.creatorId !== me!.id) {
            queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
              if (oldData) {
                return [...oldData, room];
              }
            });
          }
        });

        client.subscribe(UpdateRoomDestination, (message) => {
          const { isPrivate, roomId, roomName }: UpdateRoomPayload = JSON.parse(
            message.body,
          );

          queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
            if (oldData) {
              return oldData.map((room) => {
                if (room.id === roomId) {
                  if (room.private && !isPrivate) {
                    queryClient.invalidateQueries({
                      exact: true,
                      queryKey: [`/rooms/${roomId}/messages`],
                    });
                  }

                  return { ...room, roomName, private: isPrivate };
                }

                return room;
              });
            }
          });
        });

        client.subscribe(DeleteRoomDestination, (message) => {
          const { roomId }: DeleteRoomPayload = JSON.parse(message.body);

          queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
            if (oldData) {
              return oldData.filter((room) => room.id !== roomId);
            }
          });
        });

        client.subscribe(NewRoomMessageDestination, ({ body }) => {
          const { message, roomId }: NewRoomMessagePayload = JSON.parse(body);

          if (message.senderId !== me?.id) {
            queryClient.setQueryData<InfiniteData<Message[]>>(
              [`/rooms/${roomId}/messages`],
              (data) => {
                if (data) {
                  const newState: InfiniteData<Message[]> = {
                    pages: [[message], ...data.pages],
                    pageParams: [[message.id], ...data.pageParams],
                  };

                  return newState;
                }

                const newState: InfiniteData<Message[]> = {
                  pages: [[message]],
                  pageParams: [[message.id]],
                };

                return newState;
              },
            );
          }
        });

        client.subscribe(UpdateRoleDestination, (message) => {
          const { accessToken, role }: UpdateRolePayload = JSON.parse(
            message.body,
          );

          queryClient.setQueryData<User[]>(['/users'], (oldData) => {
            if (oldData) {
              return oldData.map((user) =>
                user.id === me!.id ? { ...user, role } : user,
              );
            }
          });

          setUser((current) => ({ ...current!, role }));
          setAccessToken(accessToken);
        });

        client.subscribe(NewPrivateRoomMessageDestination, ({ body }) => {
          const { message, roomId }: NewRoomMessagePayload = JSON.parse(body);

          if (message.senderId !== me?.id) {
            queryClient.setQueryData<InfiniteData<Message[]>>(
              [`/rooms/${roomId}/messages`],
              (data) => {
                if (data) {
                  const newState: InfiniteData<Message[]> = {
                    pages: [[message], ...data.pages],
                    pageParams: [[message.id], ...data.pageParams],
                  };

                  return newState;
                }

                const newState: InfiniteData<Message[]> = {
                  pages: [[message]],
                  pageParams: [[message.id]],
                };

                return newState;
              },
            );
          }
        });

        client.subscribe(NewDirectMessageDestination, ({ body }) => {
          const { message }: NewDirectMessagePayload = JSON.parse(body);

          if (message.senderId !== me?.id) {
            queryClient.setQueryData<InfiniteData<Message[]>>(
              [`/users/${message.senderId}/messages`],
              (data) => {
                if (data) {
                  const newState: InfiniteData<Message[]> = {
                    pages: [[message], ...data.pages],
                    pageParams: [[message.id], ...data.pageParams],
                  };

                  return newState;
                }

                const newState: InfiniteData<Message[]> = {
                  pages: [[message]],
                  pageParams: [[message.id]],
                };

                return newState;
              },
            );
          }
        });

        client.subscribe(NewRoomMemberDestination, (message) => {
          const { roomId }: NewRoomMemberPayload = JSON.parse(message.body);

          queryClient.invalidateQueries({
            exact: true,
            queryKey: [`/rooms/${roomId}/messages`],
          });

          queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
            if (oldData) {
              return oldData.map((room) =>
                room.id === roomId ? { ...room, hasAccess: true } : room,
              );
            }
          });
        });

        client.subscribe(DeleteRoomMemberDestination, (message) => {
          const { roomId }: DeleteRoomMemberPayload = JSON.parse(message.body);

          queryClient.setQueryData<Room[]>(['/rooms'], (oldData) => {
            if (oldData) {
              return oldData.map((room) =>
                room.id === roomId ? { ...room, hasAccess: false } : room,
              );
            }
          });
        });
      },
    }),
  );

  useEffect(() => {
    if (accessToken && !client.active) {
      client.connectHeaders = { accessToken };
      client.activate();
    }

    return () => {
      client.deactivate();
    };
  }, [client, accessToken]);
};
