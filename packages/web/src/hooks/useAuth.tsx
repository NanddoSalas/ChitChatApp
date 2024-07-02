import { useState } from 'react';
import { AuthenticatedUser } from '../types/api/resources';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  const signIn = (user: AuthenticatedUser, accessToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
  };

  return { isAuthenticated, user, accessToken, signIn, signOut, setUser };
};
