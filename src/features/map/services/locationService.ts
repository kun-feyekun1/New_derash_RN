import * as Location from 'expo-location';

import type { GeoPoint } from '@/types/location';

export type LocationResult =
  | { status: 'granted'; point: GeoPoint }
  | { status: 'denied' }
  | { status: 'unavailable'; message: string };

export const locationService = {
  async getCurrentLocation(): Promise<LocationResult> {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') {
      return { status: 'denied' };
    }

    try {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      return {
        status: 'granted',
        point: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      };
    } catch (error) {
      return {
        status: 'unavailable',
        message: error instanceof Error ? error.message : 'GPS is unavailable'
      };
    }
  }
};
