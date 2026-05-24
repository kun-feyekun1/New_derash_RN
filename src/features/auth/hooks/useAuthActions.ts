import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';

import { queryKeys } from '@/utils/queryKeys';
import { useAppDispatch } from '@/store/hooks';
import { showToast } from '@/store/toastSlice';

import { authService } from '../services/authService';
import { clearSession, markBootstrapped, setSession } from '../state/authSlice';

export const useBootstrapAuth = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: queryKeys.me,
    queryFn: authService.me,
    retry: false,
    gcTime: 0,
    staleTime: 0,
    enabled: false,
    meta: {
      onSuccess: (user: unknown) => dispatch(setSession(user as Parameters<typeof setSession>[0])),
      onError: () => dispatch(markBootstrapped())
    }
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (session) => {
      dispatch(setSession(session.user));
      router.replace('/home');
    },
    onError: () => dispatch(showToast('Login failed. Check your details and try again.', 'error'))
  });
};

export const useSignup = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: authService.signup,
    onSuccess: (session) => {
      dispatch(setSession(session.user));
      router.replace('/otp');
    },
    onError: () => dispatch(showToast('Signup failed. Please try again.', 'error'))
  });
};

export const useVerifyOtp = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: (session) => {
      dispatch(setSession(session.user));
      router.replace('/home');
    },
    onError: () => dispatch(showToast('Invalid verification code.', 'error'))
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      dispatch(clearSession());
      router.replace('/login');
    }
  });
};
