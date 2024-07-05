import { useContext, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { AuthContext } from '../AuthContext';
import { Message } from '../types/api/resources';
import { MessageItem } from './MessageItem';
import { MessageSkeleton } from './MessageSkeleton';

interface MessagesListProps {
  messages: Message[];
  loading: boolean;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  messages,
  loading,
}) => {
  const { user: me } = useContext(AuthContext);
  const ref = useRef<Scrollbars>(null);

  useEffect(() => {
    ref.current?.scrollToBottom();
  }, [messages]);

  return (
    <Scrollbars
      renderView={(props) => <div {...props} className="flex flex-col" />}
      ref={ref}
    >
      <div className="flex-1" />

      {loading && (
        <>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      )}

      {messages?.map((message) => (
        <MessageItem
          message={message}
          key={message.id}
          isMine={me!.id === message.senderId}
        />
      ))}
    </Scrollbars>
  );
};
