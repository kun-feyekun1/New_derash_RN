import type { GeoPoint } from '@/types/location';

export type TransportMode = 'bus' | 'minibus' | 'taxi' | 'walking' | 'rail';

export type TransportOption = {
  id: string;
  mode: TransportMode;
  routeName: string;
  operatorName: string;
  originName: string;
  destinationName: string;
  etaMinutes: number;
  walkingMinutesToStop: number;
  fareEstimate: number;
  crowdingLevel: 'low' | 'medium' | 'high';
  liveLocation?: GeoPoint;
  favorite: boolean;
};

export type TransportFilter = {
  modes: TransportMode[];
  maxWalkingMinutes: number;
  includeFutureRail: boolean;
};
