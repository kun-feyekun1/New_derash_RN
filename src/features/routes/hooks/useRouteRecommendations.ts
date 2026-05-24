import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '@/store/hooks';
import { queryKeys } from '@/utils/queryKeys';

import { routeService } from '../services/routeService';

export const useRouteRecommendations = () => {
  const origin = useAppSelector((state) => state.route.origin);
  const destination = useAppSelector((state) => state.route.destination);

  return useQuery({
    queryKey:
      origin && destination ? queryKeys.routeRecommendations(origin.id, destination.id) : ['routeRecommendations', 'missing'],
    queryFn: () => routeService.getRecommendations(origin!, destination!),
    enabled: Boolean(origin && destination)
  });
};
