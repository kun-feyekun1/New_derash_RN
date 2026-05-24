import { httpClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';
import type { GeoPoint } from '@/types/location';

import type { TransportFilter, TransportOption } from '../types/transport.types';

export const transportService = {
  async getNearby(origin: GeoPoint, filter: TransportFilter) {
    const response = await httpClient.get<ApiResponse<TransportOption[]>>('/transport/nearby', {
      params: {
        lat: origin.latitude,
        lng: origin.longitude,
        modes: filter.modes.join(','),
        maxWalkingMinutes: filter.maxWalkingMinutes,
        includeFutureRail: filter.includeFutureRail
      }
    });
    return response.data.data;
  },
  async favoriteRoute(routeId: string, favorite: boolean) {
    const response = await httpClient.post<ApiResponse<{ routeId: string; favorite: boolean }>>(
      `/transport/routes/${routeId}/favorite`,
      { favorite }
    );
    return response.data.data;
  }
};
