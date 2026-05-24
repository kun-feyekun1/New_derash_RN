import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { Route as RouteIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppHeader, EmptyState, LoadingSpinner, PrimaryButton, ScreenWrapper } from '@/components';
import { RouteCard } from '@/features/routes/components/RouteCard';
import { useRouteRecommendations } from '@/features/routes/hooks/useRouteRecommendations';
import type { RouteRecommendation } from '@/features/routes/types/route.types';
import { spacing } from '@/theme';

export default function RoutesScreen() {
  const routes = useRouteRecommendations();

  const renderItem = ({ item }: { item: RouteRecommendation }) => <RouteCard route={item} />;

  return (
    <ScreenWrapper scroll={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppHeader title="Recommended routes" subtitle="Balanced by speed, walking time, fare, and reliability." />
        </View>
        {routes.isLoading ? (
          <LoadingSpinner />
        ) : routes.isError ? (
          <EmptyState title="Could not load routes" message="Route planning is offline. Retry when your connection improves." icon={RouteIcon} actionLabel="Retry" onAction={() => routes.refetch()} />
        ) : (
          <FlashList
            data={routes.data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            drawDistance={1000}
            ListEmptyComponent={
              <EmptyState
                title="Choose a destination"
                message="Search for where you want to go and Derash will recommend route combinations."
                icon={RouteIcon}
                actionLabel="Search destination"
                onAction={() => router.push('/search')}
              />
            }
          />
        )}
        <View style={styles.footer}>
          <PrimaryButton label="Search another destination" variant="secondary" onPress={() => router.push('/search')} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.md },
  list: { padding: spacing.md },
  footer: { padding: spacing.md }
});
