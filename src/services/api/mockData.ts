import type { User, AuthTokens } from '@/features/auth/types/auth.types';
import type { TransportOption } from '@/features/transport/types/transport.types';
import type { RouteRecommendation } from '@/features/routes/types/route.types';
import type { NotificationItem } from '@/features/profile/types/profile.types';
import type { WalletSummary } from '@/features/wallet/types/wallet.types';

export const MOCK_USER: User = {
  id: 'dev-user-123',
  fullName: 'Test User',
  phoneNumber: '+251911223344',
  email: 'test@derash.com',
  preferredLanguage: 'en'
};

export const MOCK_TOKENS: AuthTokens = {
  accessToken: 'mock-access-token-' + Date.now(),
  refreshToken: 'mock-refresh-token-' + Date.now()
};

export const MOCK_NEARBY_TRANSPORT: TransportOption[] = [
  {
    id: 'bus-1',
    type: 'bus',
    routeId: 'RT-101',
    mode: 'BUS',
    distance: 0.5,
    eta: 5,
    currentLocation: { latitude: 9.0320, longitude: 38.7469 },
    destination: 'Piazza',
    price: 50,
    capacity: { total: 50, occupied: 35 },
    rating: 4.5,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'minibus-1',
    type: 'minibus',
    routeId: 'RT-202',
    mode: 'MINIBUS',
    distance: 1.2,
    eta: 8,
    currentLocation: { latitude: 9.0340, longitude: 38.7480 },
    destination: 'Bole',
    price: 35,
    capacity: { total: 15, occupied: 10 },
    rating: 4.2,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'taxi-1',
    type: 'taxi',
    routeId: 'RT-303',
    mode: 'TAXI',
    distance: 0.3,
    eta: 2,
    currentLocation: { latitude: 9.0310, longitude: 38.7460 },
    destination: 'Kazanchis',
    price: 100,
    capacity: { total: 4, occupied: 2 },
    rating: 4.7,
    lastUpdated: new Date().toISOString()
  }
];

export const MOCK_ROUTE_RECOMMENDATIONS: RouteRecommendation[] = [
  {
    id: 'route-1',
    origin: { latitude: 9.0320, longitude: 38.7469, name: 'Current Location' },
    destination: { latitude: 9.0400, longitude: 38.7500, name: 'Piazza' },
    transportModes: ['BUS', 'MINIBUS'],
    estimatedDuration: 25,
    estimatedDistance: 5.2,
    estimatedFare: 150,
    rating: 4.6,
    numberOfTransfers: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'route-2',
    origin: { latitude: 9.0320, longitude: 38.7469, name: 'Current Location' },
    destination: { latitude: 9.0450, longitude: 38.7550, name: 'Bole' },
    transportModes: ['MINIBUS', 'TAXI'],
    estimatedDuration: 35,
    estimatedDistance: 8.5,
    estimatedFare: 200,
    rating: 4.3,
    numberOfTransfers: 1,
    createdAt: new Date().toISOString()
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Your bus is arriving',
    description: 'Bus RT-101 is 2 minutes away from your location',
    type: 'INFO',
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    id: 'notif-2',
    title: 'Payment successful',
    description: 'Your payment of 150 ETB has been confirmed',
    type: 'SUCCESS',
    read: false,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: 'notif-3',
    title: 'Route delay',
    description: 'Bus RT-202 is delayed by 10 minutes',
    type: 'WARNING',
    read: true,
    createdAt: new Date(Date.now() - 60 * 60000).toISOString()
  }
];

export const MOCK_WALLET: WalletSummary = {
  balance: 5000,
  currency: 'ETB',
  lastTransactionDate: new Date().toISOString(),
  totalSpentThisMonth: 2450,
  monthlyBudget: 5000,
  recentTransactions: [
    {
      id: 'txn-1',
      amount: 150,
      type: 'DEBIT',
      description: 'Bus fare - Route RT-101',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      status: 'COMPLETED'
    },
    {
      id: 'txn-2',
      amount: 1000,
      type: 'CREDIT',
      description: 'Wallet top-up',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'COMPLETED'
    }
  ]
};
