import { useParams } from '@tanstack/react-router';
import Avatar, { genConfig } from 'react-nice-avatar';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useAuthQuery } from '../../hooks/useAuthQuery';
import { useGetUser } from '../../hooks/useGetUser';
import { Message } from '../../types/api/resources';

export const UserChatScreen = () => {
  const { userId, userName } = useParams({
    from: '/_dashboard/user/$userId/$userName',
  });
  const user = useGetUser()(parseInt(userId));

  const { data: messages, isPending } = useAuthQuery<Message[], Error>({
    queryKey: [`/users/${userId}/messages`],
  });

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

      {messages?.length === 0 ? (
        <div className="h-full flex justify-center items-center flex-col">
          <div className="chat chat-start flex items-center opacity-50 m-6">
            <div className="chat-image avatar">
              <Avatar className="w-32 h-32" {...genConfig(user?.email)} />
            </div>

            <div className="chat-bubble prose">
              <h3 className="text-gray-100 text-wrap">
                {user?.about ? user.about : 'Hi there!'}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <MessagesList messages={messages || []} loading={isPending} />
      )}

      <MessageBox
        target="user"
        targetId={parseInt(userId)}
        disabled={isPending}
      />
    </SubScreenContainer>
  );
};
