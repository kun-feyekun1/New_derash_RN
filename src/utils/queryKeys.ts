export const queryKeys = {
  me: ['me'] as const,
  nearbyTransport: (lat: number, lng: number) => ['nearbyTransport', lat, lng] as const,
  destinationSearch: (query: string) => ['destinationSearch', query] as const,
  routeRecommendations: (originId: string, destinationId: string) =>
    ['routeRecommendations', originId, destinationId] as const,
  wallet: ['wallet'] as const,
  notifications: ['notifications'] as const
};
