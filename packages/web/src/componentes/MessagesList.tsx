import { useContext, useEffect, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { AuthContext } from '../AuthContext';
import { Message } from '../types/api/resources';
import { MessageItem } from './MessageItem';

interface MessagesListProps {
  messages: Message[];
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
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
