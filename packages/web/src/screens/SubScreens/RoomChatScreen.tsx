import { useParams } from '@tanstack/react-router';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { Message } from '../../types/api/resources';

export const RoomChatScreen = () => {
  const { roomId, roomName } = useParams({
    from: '/room/$roomId/$roomName',
  });

  const { data: messages } = useAuthQuery<Message[], Error>({
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
      <MessagesList messages={messages || []} />
      <MessageBox target="room" targetId={parseInt(roomId)} />
    </SubScreenContainer>
  );
};
