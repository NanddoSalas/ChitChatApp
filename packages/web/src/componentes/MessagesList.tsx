import { useContext } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { AuthContext } from '../AuthContext';
import { Message } from '../types/api/resources';
import { MessageItem } from './MessageItem';

interface MessagesListProps {
  messages: Message[];
  onFetchMore: () => void;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  onFetchMore,
}) => {
  const { user: me } = useContext(AuthContext);

  return (
    <Virtuoso
      followOutput={'smooth'}
      data={messages}
      totalCount={messages.length}
      itemContent={(_, message, { user }) => (
        <MessageItem message={message} isMine={user.id === message.senderId} />
      )}
      startReached={onFetchMore}
      firstItemIndex={
        messages.length > 0
          ? messages[messages.length - 1].id - messages.length
          : undefined
      }
      initialTopMostItemIndex={{ behavior: 'auto', index: 'LAST' }}
      alignToBottom
      context={{ user: me! }}
    />
  );
};
