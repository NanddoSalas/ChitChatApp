import { useParams } from '@tanstack/react-router';
import Avatar, { genConfig } from 'react-nice-avatar';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { Message } from '../../types/api/resources';

export const RoomChatScreen = () => {
  const { roomId, roomName } = useParams({
    from: '/_dashboard/room/$roomId/$roomName',
  });

  const { data: messages, isPending } = useAuthQuery<Message[], Error>({
    queryKey: [`/rooms/${roomId}/messages`],
  });

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

      {messages?.length === 0 ? (
        <div className="h-full flex justify-center items-center flex-col">
          <div className="chat chat-start flex items-center opacity-50">
            <div className="chat-image avatar">
              <Avatar className="w-32 h-32" {...genConfig(roomName)} />
            </div>

            <div className="chat-bubble prose">
              <h3 className="text-gray-100 truncate">
                Be the first one to send a message in {roomName}!
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <MessagesList messages={messages || []} loading={isPending} />
      )}

      <MessageBox
        target="room"
        targetId={parseInt(roomId)}
        disabled={isPending}
      />
    </SubScreenContainer>
  );
};
