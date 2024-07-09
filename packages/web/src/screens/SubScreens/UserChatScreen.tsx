import { useParams } from '@tanstack/react-router';
import Avatar, { genConfig } from 'react-nice-avatar';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessageSkeleton } from '../../componentes/MessageSkeleton';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useGetUser } from '../../hooks/useGetUser';
import { useInfiniteMessagesQuery } from '../../hooks/useInfiniteMessagesQuery';

export const UserChatScreen = () => {
  const { userId, userName } = useParams({
    from: '/_dashboard/user/$userId/$userName',
  });
  const user = useGetUser()(parseInt(userId));

  const { fetchNextPage, ...result } = useInfiniteMessagesQuery('user', userId);

  const EmptyPlaceholder = () => (
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
  );

  const messages = result.data?.pages.flat().reverse();

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
        target="user"
        targetId={parseInt(userId)}
        disabled={!messages}
      />
    </SubScreenContainer>
  );
};
