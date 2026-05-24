import type { TransportFilter, TransportOption } from '../types/transport.types';

export const filterTransportOptions = (items: TransportOption[], filter: TransportFilter) =>
  items.filter(
    (item) =>
      filter.modes.includes(item.mode) &&
      item.walkingMinutesToStop <= filter.maxWalkingMinutes &&
      (item.mode !== 'rail' || filter.includeFutureRail)
  );
