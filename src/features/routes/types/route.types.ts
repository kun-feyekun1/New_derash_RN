import type { NamedLocation } from '@/types/location';
import type { TransportMode } from '@/features/transport/types/transport.types';

export type RouteLeg = {
  id: string;
  mode: TransportMode;
  title: string;
  from: NamedLocation;
  to: NamedLocation;
  durationMinutes: number;
  distanceMeters: number;
  polyline: string;
};

export type RouteRecommendation = {
  id: string;
  title: string;
  totalMinutes: number;
  totalFare: number;
  reliabilityScore: number;
  legs: RouteLeg[];
};
