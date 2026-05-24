import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '@/store/hooks';
import type { GeoPoint } from '@/types/location';
import { queryKeys } from '@/utils/queryKeys';
import type { TransportOption } from '../types/transport.types';

import { transportService } from '../services/transportService';

export const useNearbyTransport = (origin: GeoPoint | null) => {
  const filter = useAppSelector((state) => state.transport.filter);

  return useQuery<TransportOption[]>({
    queryKey: origin ? queryKeys.nearbyTransport(origin.latitude, origin.longitude) : ['nearbyTransport', 'missing-location'],
    queryFn: () => transportService.getNearby(origin as GeoPoint, filter),
    enabled: Boolean(origin),
    staleTime: 15000
  });
};
