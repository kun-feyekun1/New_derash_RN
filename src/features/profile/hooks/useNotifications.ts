import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/utils/queryKeys';

import { profileService } from '../services/profileService';

export const useNotifications = () =>
  useQuery({
    queryKey: queryKeys.notifications,
    queryFn: profileService.getNotifications,
    staleTime: 1000 * 30
  });
