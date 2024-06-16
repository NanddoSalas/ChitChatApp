import { useParams } from '@tanstack/react-router';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useGetRoom } from '../../hooks/useGetRoom';
import { Message } from '../../types/api/resources';

export const RoomChatScreen = () => {
  const roomId = parseInt(
    useParams({
      from: '/rooms/$roomId',
      select: (params) => params.roomId,
    }),
  );

  const room = useGetRoom()(roomId);

  const { data: messages } = useAuthQuery<Message[], Error>({
    queryKey: [`/rooms/${roomId}/messages`],
  });

  const handleSendMessage = (body: string) => {
    return body;
  };

  return (
    <SubScreenContainer disableOverflow>
      <Header start={<OpenDraweButton />} />
      <Heading center={room.roomName} />
      <MessagesList messages={messages || []} />
      <MessageBox onSendMessage={handleSendMessage} />
    </SubScreenContainer>
  );
};
