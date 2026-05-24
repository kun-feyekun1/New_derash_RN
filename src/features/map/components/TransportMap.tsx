import { memo, useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";

import { LoadingSpinner, MapMarkerCard } from "@/components";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { GeoPoint } from "@/types/location";

import { mapService } from "../services/mapService";
import type { VehicleMarker } from "../types/map.types";

// Only import maps on native platforms
let MapView: any;
let Marker: any;
let Polyline: any;
let PROVIDER_GOOGLE: any;

if (Platform.OS !== "web") {
  const maps = require("react-native-maps");
  MapView = maps.default;
  Marker = maps.Marker;
  Polyline = maps.Polyline;
  PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
}

type Props = {
  center: GeoPoint | null;
  vehicles: VehicleMarker[];
  polyline?: GeoPoint[];
};

export const TransportMap = memo(
  ({ center, vehicles, polyline = [] }: Props) => {
    const theme = useAppTheme();
    const clusteredVehicles = useMemo(
      () => mapService.clusterVehicles(vehicles),
      [vehicles],
    );

    // Web fallback - show list of vehicles instead of map
    if (Platform.OS === "web") {
      return (
        <View
          style={[
            styles.fallback,
            { backgroundColor: theme.colors.surfaceMuted },
          ]}
        >
          <View style={styles.webContainer}>
            <LoadingSpinner />
            <View style={styles.vehicleList}>
              {clusteredVehicles.map((vehicle) => (
                <MapMarkerCard
                  key={vehicle.id}
                  title={vehicle.routeId}
                  subtitle={vehicle.mode}
                />
              ))}
            </View>
          </View>
        </View>
      );
    }

    if (!center) {
      return (
        <View
          style={[
            styles.fallback,
            { backgroundColor: theme.colors.surfaceMuted },
          ]}
        >
          <LoadingSpinner />
        </View>
      );
    }

    const region = {
      latitude: center.latitude,
      longitude: center.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045,
    };

    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton={false}
        moveOnMarkerPress={false}
        toolbarEnabled={false}
      >
        {polyline.length > 1 ? (
          <Polyline
            coordinates={polyline}
            strokeColor={theme.colors.primary}
            strokeWidth={4}
          />
        ) : null}
        {clusteredVehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            coordinate={{
              latitude: vehicle.latitude,
              longitude: vehicle.longitude,
            }}
            tracksViewChanges={false}
            rotation={vehicle.heading}
          >
            <MapMarkerCard title={vehicle.routeId} subtitle={vehicle.mode} />
          </Marker>
        ))}
      </MapView>
    );
  },
);

TransportMap.displayName = "TransportMap";

const styles = StyleSheet.create({
  map: { flex: 1 },
  fallback: { flex: 1, alignItems: "center", justifyContent: "center" },
  webContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  vehicleList: { marginTop: 16, width: "100%", maxWidth: 400 },
});
