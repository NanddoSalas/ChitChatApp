import { useParams } from '@tanstack/react-router';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { Message } from '../../types/api/resources';

export const UserChatScreen = () => {
  const { userId, userName } = useParams({
    from: '/user/$userId/$userName',
  });

  const { data: messages } = useAuthQuery<Message[], Error>({
    queryKey: [`/users/${userId}/messages`],
  });

  const handleSendMessage = (body: string) => {
    return body;
  };

  return (
    <SubScreenContainer disableOverflow>
      <Header
        start={<OpenDraweButton />}
        center={
          <span className="text-white font-semibold">
            {userName.split('-').join(' ')}
          </span>
        }
        end={<></>}
      />
      <MessagesList messages={messages || []} />
      <MessageBox onSendMessage={handleSendMessage} />
    </SubScreenContainer>
  );
};
