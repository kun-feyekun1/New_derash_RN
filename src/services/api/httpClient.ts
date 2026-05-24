import axios, { AxiosError } from 'axios';

import { appConfig } from '@/config/environment';
import { DerashApiError } from '@/services/errors/apiError';
import { logger } from '@/services/logging/logger';
import type { ApiFailure } from '@/types/api';
import { setupMockInterceptor } from './mockInterceptor';

import { tokenStorage } from './tokenStorage';

export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.requestTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Derash-Client': 'mobile-expo'
  }
});

// Setup mock API interceptor (for development)
setupMockInterceptor(httpClient);

httpClient.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; requestId?: string }>) => {
    const status = error.response?.status;
    const failure: ApiFailure = {
      code: !error.response
        ? error.code === 'ECONNABORTED'
          ? 'TIMEOUT'
          : 'NETWORK_UNAVAILABLE'
        : status === 401
          ? 'UNAUTHORIZED'
          : status === 422
            ? 'VALIDATION_ERROR'
            : status && status >= 500
              ? 'SERVER_ERROR'
              : 'UNKNOWN',
      message:
        error.response?.data?.message ??
        (error.code === 'ECONNABORTED'
          ? 'The request timed out. Please try again.'
          : 'Connection failed. Check your internet and try again.'),
      status,
      requestId: error.response?.data?.requestId
    };

    logger.warn('API request failed', failure);
    return Promise.reject(new DerashApiError(failure));
  }
);
