import { httpClient } from '@/services/api';
import type { ApiResponse } from '@/types/api';

import type { NotificationItem } from '../types/profile.types';

export const profileService = {
  async getNotifications() {
    const response = await httpClient.get<ApiResponse<NotificationItem[]>>('/notifications');
    return response.data.data;
  }
};
