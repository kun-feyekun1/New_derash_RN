import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { MapPin, SearchX } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppHeader, AppText, EmptyState, LoadingSpinner, ScreenWrapper, SearchBar } from '@/components';
import { useCurrentLocation } from '@/features/map/hooks/useCurrentLocation';
import { useDestinationSearch } from '@/features/routes/hooks/useDestinationSearch';
import { setDestination } from '@/features/routes/state/routeSlice';
import { useAppDispatch } from '@/store/hooks';
import { spacing } from '@/theme';
import type { NamedLocation } from '@/types/location';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const current = useCurrentLocation();
  const point = current.data?.status === 'granted' ? current.data.point : undefined;
  const results = useDestinationSearch(query, point);

  const onSelect = (location: NamedLocation) => {
    dispatch(setDestination(location));
    router.push('/routes');
  };

  return (
    <ScreenWrapper scroll={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppHeader title="Search destination" subtitle="Find neighborhoods, terminals, landmarks, and stops." />
          <SearchBar value={query} placeholder="Search Meskel Square, Piassa, Bole..." onChangeText={setQuery} />
        </View>
        {results.isLoading ? (
          <LoadingSpinner />
        ) : results.isError ? (
          <EmptyState title="Search unavailable" message="Check your connection and try again." icon={SearchX} actionLabel="Retry" onAction={() => results.refetch()} />
        ) : (
          <FlashList
            data={results.data ?? []}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            drawDistance={1000}
            ListEmptyComponent={
              query.length >= 2 ? (
                <EmptyState title="No matches" message="Try a different spelling or nearby landmark." icon={SearchX} />
              ) : (
                <EmptyState title="Start typing" message="Search is optimized for Addis Ababa routes and landmarks." icon={MapPin} />
              )
            }
            renderItem={({ item } : { item: NamedLocation }) => (
              <Pressable accessibilityRole="button" onPress={() => onSelect(item)} style={styles.row}>
                <MapPin size={20} />
                <View style={styles.rowText}>
                  <AppText weight="700">{item.label}</AppText>
                  <AppText muted variant="caption">
                    {item.address}
                  </AppText>
                </View>
              </Pressable>
            )} 
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.md, gap: spacing.md },
  list: { padding: spacing.md },
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  rowText: { flex: 1 }
});
