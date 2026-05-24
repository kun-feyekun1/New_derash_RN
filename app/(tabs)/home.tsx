import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { AlertCircle, MapPinned } from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import {
  AppHeader,
  AppText,
  EmptyState,
  LoadingSpinner,
  ScreenWrapper,
  SearchBar,
} from "@/components";
import { TransportMap } from "@/features/map/components/TransportMap";
import { useCurrentLocation } from "@/features/map/hooks/useCurrentLocation";
import { TransportCard } from "@/features/transport/components/TransportCard";
import { useNearbyTransport } from "@/features/transport/hooks/useNearbyTransport";
import type { TransportOption } from "@/features/transport/types/transport.types";
import { useAppTheme } from "@/hooks/useAppTheme";
import { radii, spacing } from "@/theme";

export default function HomeScreen() {
  const theme = useAppTheme();
  const location = useCurrentLocation();
  const point =
    location.data?.status === "granted" ? location.data.point : null;
  const nearby = useNearbyTransport(point);
  const vehicles = useMemo(
    () =>
      (nearby.data ?? [])
        .filter((item) => item.liveLocation)
        .map((item) => ({
          id: item.id,
          mode: item.mode,
          routeId: item.routeName,
          heading: 0,
          updatedAt: new Date().toISOString(),
          latitude: item.liveLocation!.latitude,
          longitude: item.liveLocation!.longitude,
        })),
    [nearby.data],
  );

  const renderItem = ({ item }: { item: TransportOption }) => (
    <TransportCard item={item} />
  );

  return (
    <ScreenWrapper scroll={false}>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <AppHeader title="Derash" subtitle="Addis Ababa transport, unified" />
          <SearchBar
            value=""
            placeholder="Where are you going?"
            onChangeText={() => undefined}
            onPress={() => router.push("/search")}
          />
        </View>
        <View style={[styles.mapShell, { borderColor: theme.colors.border }]}>
          <TransportMap center={point} vehicles={vehicles} />
        </View>
        <View style={styles.sectionHeader}>
          <AppText variant="subtitle" weight="700">
            Nearby options
          </AppText>
          <AppText muted variant="caption">
            Live-ready
          </AppText>
        </View>
        {location.data?.status === "denied" ? (
          <EmptyState
            title="Location permission needed"
            message="Enable location to discover nearby buses, minibuses, taxis, and walking routes."
            icon={MapPinned}
            actionLabel="Try again"
            onAction={() => location.refetch()}
          />
        ) : nearby.isLoading || location.isLoading ? (
          <LoadingSpinner />
        ) : nearby.isError ? (
          <EmptyState
            title="Network issue"
            message="Derash could not load nearby transport. Cached routes will appear when available."
            icon={AlertCircle}
            actionLabel="Retry"
            onAction={() => nearby.refetch()}
          />
        ) : (
          <FlashList
            data={nearby.data ?? []}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <EmptyState
                title="No nearby transport found"
                message="Try a wider walking range or search for a destination."
                icon={MapPinned}
              />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: spacing.md },
  headerBlock: { padding: spacing.md, gap: spacing.md },
  mapShell: {
    height: 220,
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 1,
    marginHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
  },
  list: { padding: spacing.md },
});
