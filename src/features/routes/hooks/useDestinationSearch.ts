import { useQuery } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { GeoPoint } from '@/types/location';
import { queryKeys } from '@/utils/queryKeys';

import { routeService } from '../services/routeService';

export const useDestinationSearch = (query: string, userLocation?: GeoPoint) => {
  const debouncedQuery = useDebouncedValue(query.trim(), 350);

  return useQuery({
    queryKey: queryKeys.destinationSearch(debouncedQuery),
    queryFn: () => routeService.searchDestinations(debouncedQuery, userLocation),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60
  });
};
