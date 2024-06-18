import { User } from './resources';

// post /auth/signin

export interface SignInForm {
  email?: string;
  password?: string;
}

export interface SingInData {
  accessToken: string;
  user: User;
}

export interface SingInErrors {
  message?: string;
}

// post /auth/signup

export interface SignUpForm {
  password: string;
  inviteCode: string;
  fullName: string;
  email: string;
}

export interface SingUpErrors {
  password?: string;
  inviteCode?: string;
  fullName?: string;
  email?: string;
}
