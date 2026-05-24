import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
      staleTime: 1000 * 30,
      retry: (failureCount, error) => {
        const status = (error as { failure?: { status?: number } }).failure?.status;
        return status === 401 ? false : failureCount < 2;
      },
      networkMode: 'offlineFirst'
    },
    mutations: {
      retry: 1,
      networkMode: 'online'
    }
  }
});

export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'DERASH_QUERY_CACHE',
  throttleTime: 2000
});
