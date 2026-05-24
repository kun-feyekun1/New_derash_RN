import type { GeoPoint } from '@/types/location';

import type { VehicleMarker } from '../types/map.types';

const toRadians = (value: number) => (value * Math.PI) / 180;

export const mapService = {
  estimateEtaMinutes(distanceMeters: number, averageKph: number) {
    const metersPerMinute = (averageKph * 1000) / 60;
    return Math.max(1, distanceMeters / metersPerMinute);
  },
  haversineMeters(a: GeoPoint, b: GeoPoint) {
    const earthRadius = 6371000;
    const dLat = toRadians(b.latitude - a.latitude);
    const dLng = toRadians(b.longitude - a.longitude);
    const lat1 = toRadians(a.latitude);
    const lat2 = toRadians(b.latitude);
    const h =
      Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    return 2 * earthRadius * Math.asin(Math.sqrt(h));
  },
  clusterVehicles(markers: VehicleMarker[], precision = 3) {
    const buckets = new Map<string, VehicleMarker[]>();
    markers.forEach((marker) => {
      const key = `${marker.latitude.toFixed(precision)}:${marker.longitude.toFixed(precision)}:${marker.mode}`;
      buckets.set(key, [...(buckets.get(key) ?? []), marker]);
    });
    return Array.from(buckets.values()).map((items) => items[0]).filter(Boolean) as VehicleMarker[];
  }
};
