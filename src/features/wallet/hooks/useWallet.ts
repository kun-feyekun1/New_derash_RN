import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/utils/queryKeys';

import { walletService } from '../services/walletService';

export const useWallet = () =>
  useQuery({
    queryKey: queryKeys.wallet,
    queryFn: walletService.getSummary,
    staleTime: 1000 * 60
  });
