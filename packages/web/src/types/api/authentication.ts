import { AuthenticatedUser, User } from './resources';

// post /auth/signin

export interface SignInForm {
  email?: string;
  password?: string;
}

export interface SingInData {
  accessToken: string;
  user: AuthenticatedUser;
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

// post /auth/signin/google

export interface GoogleSignInForm {
  code: string;
}

// post /auth/signup/google

export interface GoogleSignUpForm {
  code: string;
  inviteCode: string;
}

export interface GoogleSignUpErrors {
  message?: string;
}
