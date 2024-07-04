import Avatar, { AvatarFullConfig, genConfig } from 'react-nice-avatar';

export const Logo = () => {
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
    <div className="flex justify-center">
      <div className="chat chat-start flex items-center bg-gray-100 p-4 rounded-2xl">
        <div className="chat-image avatar">
          <Avatar className="w-24 h-24" {...myConfig} />
        </div>

        <div className="chat-bubble prose">
          <h3 className="text-gray-100">{'ChitChatZone'}</h3>
        </div>
      </div>
    </div>
  );
};
