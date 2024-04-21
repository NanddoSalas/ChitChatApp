import { ChatHeading } from '../../componentes/ChatHeading';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { MessageBox } from '../../componentes/MessageBox';
import { MessagesList } from '../../componentes/MessagesList';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { useStore } from '../../store';
import { classNames } from '../../utils';

export const ChatScreen = () => {
  const { id, path } = useStore((state) => state.navigation);
  const target = path === '/users/:id' ? 'user' : 'room';

  return (
    <SubScreenContainer disableOverflow>
      <Header start={<OpenDraweButton />} />

      <div
        className={classNames(
          'space-y-4 sm:space-y-6 lg:space-y-8 flex-1',
          'pt-4 sm:pt-6 lg:pt-8',
          'hidden lg:block',
        )}
      >
        <ChatHeading target={target} targetId={id!} />
      </div>

      <MessagesList target={target} targetId={id!} />

      <div
        className={classNames(
          'px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-8 flex-1',
          'pb-4 sm:pb-6 lg:pb-8',
          'pt-4 sm:pt-6 lg:pt-8',
          'border-t border-gray-300',
        )}
      >
        <MessageBox target={target} targetId={id!} />
      </div>
    </SubScreenContainer>
  );
};
