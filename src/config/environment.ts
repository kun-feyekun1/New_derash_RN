import Constants from 'expo-constants';

export type AppEnvironment = 'development' | 'staging' | 'production';

type FeatureFlags = {
  enableRealtimeTracking: boolean;
  enableRailPreview: boolean;
  enableAmharicLocale: boolean;
  enablePayments: boolean;
};

type AppConfig = {
  env: AppEnvironment;
  apiBaseUrl: string;
  realtimeUrl: string;
  requestTimeoutMs: number;
  featureFlags: FeatureFlags;
};

const releaseChannel = Constants.expoConfig?.extra?.releaseChannel as string | undefined;

const env: AppEnvironment =
  releaseChannel === 'production' ? 'production' : releaseChannel === 'staging' ? 'staging' : 'development';

const urls: Record<AppEnvironment, Pick<AppConfig, 'apiBaseUrl' | 'realtimeUrl'>> = {
  development: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.dev.derash.et/v1',
    realtimeUrl: process.env.EXPO_PUBLIC_REALTIME_URL ?? 'wss://realtime.dev.derash.et'
  },
  staging: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.staging.derash.et/v1',
    realtimeUrl: process.env.EXPO_PUBLIC_REALTIME_URL ?? 'wss://realtime.staging.derash.et'
  },
  production: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.derash.et/v1',
    realtimeUrl: process.env.EXPO_PUBLIC_REALTIME_URL ?? 'wss://realtime.derash.et'
  }
};

export const appConfig: AppConfig = {
  env,
  ...urls[env],
  requestTimeoutMs: 12000,
  featureFlags: {
    enableRealtimeTracking: true,
    enableRailPreview: true,
    enableAmharicLocale: true,
    enablePayments: false
  }
};
