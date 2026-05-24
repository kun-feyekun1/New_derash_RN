export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type NamedLocation = GeoPoint & {
  id: string;
  label: string;
  address: string;
  neighborhood?: string;
};
