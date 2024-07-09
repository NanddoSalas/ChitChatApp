import { useParams } from '@tanstack/react-router';
import Avatar, { genConfig } from 'react-nice-avatar';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessageSkeleton } from '../../componentes/MessageSkeleton';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useInfiniteMessagesQuery } from '../../hooks/useInfiniteMessagesQuery';

export const RoomChatScreen = () => {
  const { roomId, roomName } = useParams({
    from: '/_dashboard/room/$roomId/$roomName',
  });

  const { fetchNextPage, isPending, ...result } = useInfiniteMessagesQuery(
    'room',
    roomId,
  );

  const EmptyPlaceholder = () => (
    <div className="h-full flex justify-center items-center flex-col">
      <div className="chat chat-start flex items-center opacity-50 m-6">
        <div className="chat-image avatar">
          <Avatar className="w-32 h-32" {...genConfig(roomName)} />
        </div>

        <div className="chat-bubble prose">
          <h3 className="text-gray-100 text-wrap">
            Be the first one to send a message in {roomName}!
          </h3>
        </div>
      </div>
    </div>
  );

  const messages = result.data?.pages.flat().reverse();

  return (
    <SubScreenContainer disableOverflow>
      <Header
        start={<OpenDraweButton />}
        center={
          <span className="text-white font-semibold">
            {roomName.split('-').join(' ')}
          </span>
        }
        end={<></>}
      />

      {messages ? (
        messages.length === 0 ? (
          <EmptyPlaceholder />
        ) : (
          <MessagesList messages={messages} onFetchMore={fetchNextPage} />
        )
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex-1" />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      )}

      <MessageBox
        target="room"
        targetId={parseInt(roomId)}
        disabled={!messages}
      />
    </SubScreenContainer>
  );
};
