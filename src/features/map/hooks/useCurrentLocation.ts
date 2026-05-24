import { useQuery } from '@tanstack/react-query';

import { locationService } from '../services/locationService';

export const useCurrentLocation = () =>
  useQuery({
    queryKey: ['currentLocation'],
    queryFn: locationService.getCurrentLocation,
    staleTime: 1000 * 60,
    retry: false
  });
