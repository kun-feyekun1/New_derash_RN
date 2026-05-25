import type { AxiosInstance } from 'axios';
import { MOCK_USER, MOCK_TOKENS, MOCK_NEARBY_TRANSPORT, MOCK_ROUTE_RECOMMENDATIONS, MOCK_NOTIFICATIONS, MOCK_WALLET } from './mockData';

const ENABLE_MOCK_API = process.env.EXPO_PUBLIC_MOCK_API === 'true' || __DEV__;

export const setupMockInterceptor = (client: AxiosInstance) => {
  if (!ENABLE_MOCK_API) {
    return;
  }

  client.interceptors.request.use((config) => {
    const url = config.url || '';

    // Login/Signup endpoints
    if (url.includes('/auth/login') || url.includes('/auth/signup')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: {
              user: MOCK_USER,
              tokens: MOCK_TOKENS
            }
          };
          resolve(config);
        }, 1000); // Simulate 1s delay
      });
    }

    // Verify OTP
    if (url.includes('/auth/verify-otp')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: {
              user: MOCK_USER,
              tokens: MOCK_TOKENS
            }
          };
          resolve(config);
        }, 800);
      });
    }

    // Forgot password
    if (url.includes('/auth/forgot-password')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: { message: 'OTP sent to your phone' }
          };
          resolve(config);
        }, 600);
      });
    }

    // Nearby transport
    if (url.includes('/transport/nearby')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: MOCK_NEARBY_TRANSPORT
          };
          resolve(config);
        }, 500);
      });
    }

    // Route recommendations
    if (url.includes('/routes/recommendations')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: MOCK_ROUTE_RECOMMENDATIONS
          };
          resolve(config);
        }, 800);
      });
    }

    // Destination search
    if (url.includes('/routes/search-destinations')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: [
              { name: 'Piazza', latitude: 9.0400, longitude: 38.7500 },
              { name: 'Bole', latitude: 9.0450, longitude: 38.7550 },
              { name: 'Kazanchis', latitude: 9.0310, longitude: 38.7460 },
              { name: 'Meskel Square', latitude: 9.0330, longitude: 38.7480 }
            ]
          };
          resolve(config);
        }, 300);
      });
    }

    // Notifications
    if (url.includes('/profile/notifications')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: MOCK_NOTIFICATIONS
          };
          resolve(config);
        }, 400);
      });
    }

    // Wallet
    if (url.includes('/wallet')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          (config as any).mockResponse = {
            status: 200,
            data: MOCK_WALLET
          };
          resolve(config);
        }, 500);
      });
    }

    return config;
  });

  // Response interceptor for mock responses
  client.interceptors.response.use((response) => {
    if ((response.config as any).mockResponse) {
      return (response.config as any).mockResponse;
    }
    return response;
  });
};
