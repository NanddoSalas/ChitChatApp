import { useParams } from '@tanstack/react-router';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { Heading } from '../../componentes/Heading';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useGetUser } from '../../hooks/useGetUser';
import { Message } from '../../types/api/resources';

export const UserChatScreen = () => {
  const userId = parseInt(
    useParams({
      from: '/users/$userId',
      select: (params) => params.userId,
    }),
  );

  const user = useGetUser()(userId);

  const { data: messages } = useAuthQuery<Message[], Error>({
    queryKey: [`/users/${user.id}/messages`],
  });

  const handleSendMessage = (body: string) => {
    return body;
  };

  return (
    <SubScreenContainer disableOverflow>
      <Header start={<OpenDraweButton />} />
      <Heading center={user.fullName} />
      <MessagesList messages={messages || []} />
      <MessageBox onSendMessage={handleSendMessage} />
    </SubScreenContainer>
  );
};
