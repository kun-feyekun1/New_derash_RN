import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { MapViewport, VehicleMarker } from '../types/map.types';

type MapState = {
  viewport: MapViewport | null;
  selectedVehicleId: string | null;
  liveVehicles: VehicleMarker[];
};

const mapSlice = createSlice({
  name: 'map',
  initialState: { viewport: null, selectedVehicleId: null, liveVehicles: [] } satisfies MapState,
  reducers: {
    setViewport(state, action: PayloadAction<MapViewport>) {
      state.viewport = action.payload;
    },
    setLiveVehicles(state, action: PayloadAction<VehicleMarker[]>) {
      state.liveVehicles = action.payload;
    },
    selectVehicle(state, action: PayloadAction<string | null>) {
      state.selectedVehicleId = action.payload;
    }
  }
});

export const { setViewport, setLiveVehicles, selectVehicle } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
