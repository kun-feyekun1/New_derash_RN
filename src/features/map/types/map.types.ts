import type { GeoPoint } from '@/types/location';
import type { TransportMode } from '@/features/transport/types/transport.types';

export type VehicleMarker = GeoPoint & {
  id: string;
  mode: TransportMode;
  heading: number;
  routeId: string;
  updatedAt: string;
};

export type MapViewport = GeoPoint & {
  latitudeDelta: number;
  longitudeDelta: number;
};
