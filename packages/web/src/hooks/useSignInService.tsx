import { useNavigate } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import {
  SignInForm,
  SingInData,
  SingInErrors,
} from '../types/api/authentication';
import { useAuthMutation } from './useAuthMutation';

export const useSignInService = () => {
  const { isAuthenticated, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate, data, isPending, error } = useAuthMutation<
    SingInData,
    SingInErrors,
    SignInForm
  >({ mutationKey: ['/auth/signin'] });

  const signInService = (form: SignInForm) => mutate(form);

  useEffect(() => {
    if (data?.accessToken && data.user) {
      signIn(data.user, data.accessToken);
    }
  }, [data?.accessToken, data?.user, signIn]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  return { signInService, isSigningIn: isPending, signInError: error?.message };
};
