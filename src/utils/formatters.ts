export const formatEta = (minutes: number) => `${Math.max(1, Math.round(minutes))} min`;

export const formatCurrency = (amount: number, currency = 'ETB') =>
  new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amount);

export const formatDistance = (meters: number) =>
  meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters)} m`;
