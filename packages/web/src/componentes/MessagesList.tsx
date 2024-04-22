import { useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useStore } from '../store';
import { MessageItem } from './MessageItem';

interface MessagesListProps {
  target: 'user' | 'room';
  targetId: number;
}

export const MessagesList: React.FC<MessagesListProps> = ({
  target,
  targetId,
}) => {
  const { user } = useStore((state) => state.auth);
  const messages = useStore((state) =>
    target === 'room'
      ? state.roomMessages[targetId].data
      : state.directMessages[targetId].data,
  );

  const ref = useRef<Scrollbars>(null);

  useEffect(() => {
    ref.current?.scrollToBottom();
  }, [target, targetId]);

  return (
    <Scrollbars
      renderView={(props) => <div {...props} className="flex flex-col" />}
      ref={ref}
    >
      <div className="flex-1" />

      {messages?.map((message) => (
        <MessageItem
          message={message}
          key={message.id}
          isMine={user?.id === message.sendById}
        />
      ))}
    </Scrollbars>
  );
};
