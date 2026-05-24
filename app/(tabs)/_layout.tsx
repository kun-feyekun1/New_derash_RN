import { Tabs } from 'expo-router';
import { Home, MapPinned, Route, User, Wallet } from 'lucide-react-native';

import { useAppTheme } from '@/hooks/useAppTheme';

export default function TabsLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 64
        },
        tabBarLabelStyle: { fontSize: 12 }
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home color={color} size={22} /> }} />
      <Tabs.Screen name="search" options={{ title: 'Search', tabBarIcon: ({ color }) => <MapPinned color={color} size={22} /> }} />
      <Tabs.Screen name="routes" options={{ title: 'Routes', tabBarIcon: ({ color }) => <Route color={color} size={22} /> }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet', tabBarIcon: ({ color }) => <Wallet color={color} size={22} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User color={color} size={22} /> }} />
    </Tabs>
  );
}
