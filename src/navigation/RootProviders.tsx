import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StyleSheet } from 'react-native';

import { ErrorBoundary, LoadingSpinner, ToastMessage } from '@/components';
import { queryClient, queryPersister } from '@/services/api';
import { persistor, store } from '@/store';

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <GestureHandlerRootView style={styles.root}>
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: queryPersister, maxAge: 1000 * 60 * 60 * 24 }}
        >
          <ErrorBoundary>
            {children}
            <ToastMessage />
            <StatusBar style="auto" />
          </ErrorBoundary>
        </PersistQueryClientProvider>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: { flex: 1 }
});
