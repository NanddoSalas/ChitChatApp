import { useContext } from 'react';
import Avatar, { AvatarFullConfig, genConfig } from 'react-nice-avatar';
import { AuthContext } from '../../AuthContext';
import { OpenDraweButton } from '../../componentes/Drawer';
import { Header } from '../../componentes/Header';
import { SubScreenContainer } from '../../componentes/SubScreenContainer';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  const config: AvatarFullConfig = {
    sex: 'man',
    faceColor: '#F9C9B6',
    earSize: 'small',
    eyeStyle: 'circle',
    noseStyle: 'long',
    mouthStyle: 'laugh',
    shirtStyle: 'polo',
    glassesStyle: 'round',
    hairStyle: 'thick',
    hairColor: '#F9C9B6',
    hatStyle: 'none',
    eyeBrowStyle: 'up',
    shirtColor: '#2b3440',
    bgColor: '#e5e7eb',
  };

  const myConfig = genConfig(config);

  return (
    <SubScreenContainer>
      <Header
        start={<OpenDraweButton />}
        center={<span className="text-white font-semibold">ChitChatZone</span>}
        end={<></>}
      />

      <div className="flex h-2/3 justify-center items-center">
        <div className="chat chat-start flex items-center opacity-50 m-6">
          <div className="chat-image avatar">
            <Avatar className="w-24 h-24" {...myConfig} />
          </div>

          <div className="chat-bubble prose">
            <h3 className="text-gray-100">
              Hi {user?.fullName}, How is it going?
            </h3>

            <h3 className="text-gray-100 hidden lg:block">
              Type 'ctr + k' to open the navigation palette!
            </h3>

            <h3 className="text-gray-100 lg:hidden">
              Press the hamburger button to start navigating!
            </h3>
          </div>
        </div>
      </div>
    </SubScreenContainer>
  );
};

export default HomeScreen;
