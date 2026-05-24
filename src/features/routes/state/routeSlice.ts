import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { NamedLocation } from '@/types/location';

type RouteState = {
  origin: NamedLocation | null;
  destination: NamedLocation | null;
  savedLocations: NamedLocation[];
};

const routeSlice = createSlice({
  name: 'route',
  initialState: { origin: null, destination: null, savedLocations: [] } satisfies RouteState,
  reducers: {
    setOrigin(state, action: PayloadAction<NamedLocation | null>) {
      state.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<NamedLocation | null>) {
      state.destination = action.payload;
    },
    saveLocation(state, action: PayloadAction<NamedLocation>) {
      if (!state.savedLocations.some((location) => location.id === action.payload.id)) {
        state.savedLocations.push(action.payload);
      }
    }
  }
});

export const { setOrigin, setDestination, saveLocation } = routeSlice.actions;
export const routeReducer = routeSlice.reducer;
