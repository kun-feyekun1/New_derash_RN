import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TransportFilter, TransportMode } from '../types/transport.types';

type TransportState = {
  filter: TransportFilter;
  favoriteRouteIds: string[];
};

const initialState: TransportState = {
  filter: {
    modes: ['bus', 'minibus', 'taxi', 'walking'],
    maxWalkingMinutes: 15,
    includeFutureRail: true
  },
  favoriteRouteIds: []
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    toggleMode(state, action: PayloadAction<TransportMode>) {
      const exists = state.filter.modes.includes(action.payload);
      state.filter.modes = exists
        ? state.filter.modes.filter((mode) => mode !== action.payload)
        : [...state.filter.modes, action.payload];
    },
    setMaxWalkingMinutes(state, action: PayloadAction<number>) {
      state.filter.maxWalkingMinutes = action.payload;
    },
    toggleFavoriteRoute(state, action: PayloadAction<string>) {
      state.favoriteRouteIds = state.favoriteRouteIds.includes(action.payload)
        ? state.favoriteRouteIds.filter((id) => id !== action.payload)
        : [...state.favoriteRouteIds, action.payload];
    }
  }
});

export const { toggleMode, setMaxWalkingMinutes, toggleFavoriteRoute } = transportSlice.actions;
export const transportReducer = transportSlice.reducer;
