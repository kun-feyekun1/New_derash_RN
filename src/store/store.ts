import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import { authReducer } from '@/features/auth/state/authSlice';
import { mapReducer } from '@/features/map/state/mapSlice';
import { routeReducer } from '@/features/routes/state/routeSlice';
import { transportReducer } from '@/features/transport/state/transportSlice';

import { themeReducer } from './themeSlice';
import { toastReducer } from './toastSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  toast: toastReducer,
  transport: transportReducer,
  route: routeReducer,
  map: mapReducer
});

// Only use AsyncStorage on client/native platforms
const storage = typeof window !== 'undefined' ? AsyncStorage : null;

const persistedReducer = persistReducer(
  {
    key: 'derash-root',
    storage: storage || require('redux-persist/lib/storage/session').default,
    whitelist: ['auth', 'theme', 'transport', 'route']
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
