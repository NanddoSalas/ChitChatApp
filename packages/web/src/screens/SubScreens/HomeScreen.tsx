import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';
import { SubScreenLayout } from '../../componentes/SubScreenLayout';

const HomeScreen = () => {
  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">ChitChatZone</span>}
        end={<></>}
      />

      <SubScreenLayout>{null}</SubScreenLayout>
    </SubScreenContainer>
  );
};

export default HomeScreen;
