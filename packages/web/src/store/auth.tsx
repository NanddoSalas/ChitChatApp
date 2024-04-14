import { StateCreator } from 'zustand';
import { OAuthProvider, User } from '../types/resources';

interface State {
  auth: {
    accessToken: string | null;
    user: User | null;
    authMethods: {
      password: boolean;
      google: boolean;
      github: boolean;
    } | null;
    fetching: boolean;
  };
}

interface Actions {
  signInWithPassword: (email: string, password: string) => void;
  signUpWithPassword: (
    email: string,
    password: string,
    inviteCode: string,
  ) => void;
  signInWithOAuthProvider: (
    provider: OAuthProvider,
    accessToken: string,
  ) => void;
  signUpWithOAuthProvider: (
    provider: OAuthProvider,
    accessToken: string,
    inviteCode: string,
  ) => void;
  connectOAuthProvider: (provider: OAuthProvider, accessToken: string) => void;
  disconnectOAuthProvider: (
    provider: OAuthProvider,
    accessToken: string,
  ) => void;
  updateUser: (name: string, about: string) => void;
  updatePassword: (oldPassword: string, newPassword: string) => void;
  signOut: () => void;
}

export interface AuthSlice extends State, Actions {}

export const createAuthSlice: StateCreator<AuthSlice> = () => ({
  auth: {
    accessToken: null,
    user: null,
    fetching: false,
    authMethods: { github: true, google: false, password: true },
  },

  signInWithPassword: () => {},
  signUpWithPassword: () => {},
  signInWithOAuthProvider: () => {},
  signUpWithOAuthProvider: () => {},
  connectOAuthProvider: () => {},
  disconnectOAuthProvider: () => {},
  updateUser: () => {},
  updatePassword: () => {},
  signOut: () => {},
});
