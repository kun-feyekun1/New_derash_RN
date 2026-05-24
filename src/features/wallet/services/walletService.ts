import { httpClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

import type { WalletSummary } from '../types/wallet.types';

export const walletService = {
  async getSummary() {
    const response = await httpClient.get<ApiResponse<WalletSummary>>('/wallet');
    return response.data.data;
  }
};
