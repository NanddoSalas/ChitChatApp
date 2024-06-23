import { createFileRoute } from '@tanstack/react-router';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { HomeScreen } from '../screens/SubScreens';
import { WelcomeScreen } from '../screens/WelcomeScreen';

export const Route = createFileRoute('/')({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) return <HomeScreen />;

    return <WelcomeScreen />;
  },
});
