import { httpClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';
import type { GeoPoint, NamedLocation } from '@/types/location';

import type { RouteRecommendation } from '../types/route.types';

export const routeService = {
  async searchDestinations(query: string, userLocation?: GeoPoint) {
    const response = await httpClient.get<ApiResponse<NamedLocation[]>>('/locations/search', {
      params: {
        q: query,
        lat: userLocation?.latitude,
        lng: userLocation?.longitude
      }
    });
    return response.data.data;
  },
  async getRecommendations(origin: NamedLocation, destination: NamedLocation) {
    const response = await httpClient.get<ApiResponse<RouteRecommendation[]>>('/routes/recommendations', {
      params: {
        originId: origin.id,
        destinationId: destination.id
      }
    });
    return response.data.data;
  }
};
