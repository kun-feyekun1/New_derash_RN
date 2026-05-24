# Mock Backend API Setup Guide

## Overview

Your app now has a complete mock backend API system that automatically responds to API calls with realistic test data during development.

## Files Created

### 1. `src/services/api/mockData.ts`

Contains all mock data:

- `MOCK_USER` - Test user (the one you logged in with)
- `MOCK_TOKENS` - Auth tokens
- `MOCK_NEARBY_TRANSPORT` - 3 sample transport vehicles
- `MOCK_ROUTE_RECOMMENDATIONS` - Route suggestions
- `MOCK_NOTIFICATIONS` - 3 sample notifications
- `MOCK_WALLET` - Wallet balance and transactions

### 2. `src/services/api/mockInterceptor.ts`

Intercepts all API requests and returns mock data for:

- `/auth/login` → Returns user + tokens (1s delay)
- `/auth/signup` → Returns user + tokens (1s delay)
- `/auth/verify-otp` → Returns user + tokens (800ms delay)
- `/auth/forgot-password` → Returns OTP message (600ms delay)
- `/transport/nearby` → Returns 3 mock vehicles (500ms delay)
- `/routes/recommendations` → Returns 2 route options (800ms delay)
- `/routes/search-destinations` → Returns 4 cities (300ms delay)
- `/profile/notifications` → Returns 3 notifications (400ms delay)
- `/wallet` → Returns wallet data with transactions (500ms delay)

### 3. Updated `src/services/api/httpClient.ts`

Now loads the mock interceptor automatically.

## How to Use

### Enable/Disable Mock API

The mock API is **enabled by default in development mode** (`__DEV__` = true).

To explicitly control it, set the environment variable:

```bash
EXPO_PUBLIC_MOCK_API=true   # Enable mock API
EXPO_PUBLIC_MOCK_API=false  # Disable mock API (use real backend)
```

### Real-World Usage

**With Mock API (Development):**

1. ✅ Mock data used for all API calls
2. ✅ No backend server needed
3. ✅ Simulated network delays
4. ✅ Perfect for UI/UX testing

**With Real Backend (Production):**

- Set `EXPO_PUBLIC_MOCK_API=false`
- Configure real `API_BASE_URL` in environment
- App automatically uses real API endpoints

## Testing the Mock API

### Test Case 1: Login Flow

1. Go to Settings → Click "Reset App"
2. App redirects to Login page
3. Click Login with any credentials
4. **Mock API returns user data in ~1 second**
5. App logs you in and shows home page

### Test Case 2: Browse Transport

1. Click "📱 Mock Login" on Settings
2. Go to Home tab
3. See 3 mock vehicles (Bus, Minibus, Taxi)
4. Click any vehicle to see details
5. **All data comes from MOCK_NEARBY_TRANSPORT**

### Test Case 3: Search Routes

1. Go to Search tab
2. Type any destination
3. See 4 mock cities auto-complete
4. Click destination
5. See 2 recommended routes with estimated fares

### Test Case 4: Check Wallet

1. Go to Wallet tab
2. See balance: 5000 ETB
3. See spending: 2450 ETB this month
4. See 2 recent transactions

### Test Case 5: Notifications

1. Go to Notifications (top nav)
2. See 3 sample notifications
3. Different types: INFO, SUCCESS, WARNING

## Customizing Mock Data

Want to change mock data? Edit `src/services/api/mockData.ts`:

```typescript
// Change user name
export const MOCK_USER: User = {
  fullName: "Your Name", // ← Change here
  // ...
};

// Add more vehicles
export const MOCK_NEARBY_TRANSPORT: TransportOption[] = [
  // ... existing vehicles
  {
    id: "bus-2",
    type: "bus",
    routeId: "RT-104",
    // ... add your data
  },
];
```

## Simulated Network Delays

Each endpoint has realistic delays to simulate network latency:

- Auth endpoints: 600-1000ms
- Transport/routes: 300-800ms
- Profile/wallet: 400-500ms

To change delays, edit `src/services/api/mockInterceptor.ts`:

```typescript
setTimeout(() => {
  // ... change "1000" to your desired delay in ms
}, 1000); // ← Change this number
```

## Next Steps

1. ✅ App is fully testable with mock data
2. ✅ Try all features without backend
3. ✅ When backend is ready:
   - Set `EXPO_PUBLIC_MOCK_API=false`
   - Update `API_BASE_URL`
   - Keep mock data file for reference or future testing

## Need Real Backend?

When your backend is ready:

1. Update `.env` file with real API URL
2. Ensure endpoints match the paths in mockInterceptor.ts
3. Set `EXPO_PUBLIC_MOCK_API=false` or just remove mock setup
4. Test thoroughly!
