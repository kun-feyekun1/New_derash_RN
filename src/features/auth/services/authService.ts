import type { ApiResponse } from '@/types/api';
import { httpClient, tokenStorage } from '@/services/api';

import type { AuthSession, User } from '../types/auth.types';
import type { ForgotPasswordFormValues, LoginFormValues, OtpFormValues, SignupFormValues } from '../utils/authSchemas';

export const authService = {
  async login(payload: LoginFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>('/auth/login', payload);
    await tokenStorage.setTokens(response.data.data.tokens.accessToken, response.data.data.tokens.refreshToken);
    return response.data.data;
  },
  async signup(payload: SignupFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>('/auth/signup', payload);
    await tokenStorage.setTokens(response.data.data.tokens.accessToken, response.data.data.tokens.refreshToken);
    return response.data.data;
  },
  async verifyOtp(payload: OtpFormValues) {
    const response = await httpClient.post<ApiResponse<AuthSession>>('/auth/otp/verify', payload);
    await tokenStorage.setTokens(response.data.data.tokens.accessToken, response.data.data.tokens.refreshToken);
    return response.data.data;
  },
  async forgotPassword(payload: ForgotPasswordFormValues) {
    await httpClient.post<ApiResponse<{ accepted: boolean }>>('/auth/password/forgot', payload);
  },
  async me() {
    const response = await httpClient.get<ApiResponse<User>>('/me');
    return response.data.data;
  },
  async logout() {
    await tokenStorage.clearTokens();
  }
};
