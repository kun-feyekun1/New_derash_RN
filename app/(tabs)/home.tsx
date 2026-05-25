import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Href } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Car,
  MapPin,
  Shield,
  Award,
  ChevronRight,
  Star,
  TrendingUp,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Smooth CountUp component (triggers when `visible` becomes true)
// -----------------------------------------------------------------------------
const CountUp = ({
  target,
  duration = 2000,
  delay = 0,
  suffix = '',
  visible,
}: {
  target: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  visible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const increment = target / (duration / 16); // 60fps
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [visible, target, duration, delay]);

  return (
    <Text className="text-5xl font-bold text-primary">
      {count}
      {suffix}
    </Text>
  );
};

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------
export default function WelcomeScreen() {
  const router = useRouter();
  const scrollY = useSharedValue(0);
  const statsRef = useRef<View>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Parallax background effect
  const heroBgStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scrollY.value * 0.3 }],
  }));

  // Animated car moving across the screen
  const carPosition = useSharedValue(-50);
  useEffect(() => {
    carPosition.value = withRepeat(
      withSequence(
        withTiming(width + 50, { duration: 8000 }),
        withTiming(-50, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);
  const carStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: carPosition.value }],
  }));

  // Haptic feedback on press
const handlePress = (route: Href) => {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
  router.push(route);
};

  // Scroll handler: check when stats section becomes visible
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (statsRef.current && !statsVisible) {
        // measure is called on the UI thread? No, we need to run it on JS.
        // Use a workaround: runOnJS? Simpler: use a regular onScroll on the ScrollView.
        // We'll move this logic to a native EventListener via ref.
      }
    },
  });

  // Use a regular ScrollView onScroll to detect stats visibility
  const onScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
    if (statsRef.current && !statsVisible) {
      statsRef.current.measure((x, y, w, h, pageX, pageY) => {
        const scrollPos = event.nativeEvent.contentOffset.y;
        const windowHeight = height;
        if (pageY + h > scrollPos && pageY < scrollPos + windowHeight) {
          setStatsVisible(true);
        }
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black" edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        className="flex-1"
      >
        {/* ---------- Hero Section ---------- */}
        <View className="relative h-[100vh] justify-center items-center overflow-hidden">
          <Animated.View style={[heroBgStyle]} className="absolute inset-0">
            <LinearGradient
              colors={['#020617', '#0f172a', '#1e293b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="absolute inset-0"
            />
          </Animated.View>

          {/* Animated moving car in background */}
          <Animated.View
            style={[carStyle, { position: 'absolute', bottom: '15%', left: 0 }]}
            className="bg-primary/20 p-3 rounded-full backdrop-blur-sm"
          >
            <Car color="#00ff9f" size={48} strokeWidth={1.5} />
          </Animated.View>

          <View className="items-center z-10 px-6">
            <Animated.Text
              entering={FadeInDown.delay(200).springify()}
              className="text-7xl font-bold text-white text-center mb-4 tracking-tight"
            >
              Derash
              fyyyyy
              qwertyuiop
              asdfghjkl
              zxcvbnm
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(300)}
              className="text-2xl text-primary font-semibold text-center mb-6"
            >
              Move Smarter • Travel Safer
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(400)}
              className="text-base text-gray-300 text-center max-w-[300px] mb-12 leading-6"
            >
              Ethiopia's most advanced transport network — rides, routes, delivery & more.
            </Animated.Text>

            <Animated.View entering={FadeInDown.delay(500)} className="w-full gap-4">
              <TouchableOpacity
                onPress={() => handlePress('/(auth)/login')}
                activeOpacity={0.9}
                className="bg-primary py-4 rounded-2xl shadow-lg shadow-primary/30"
              >
                <Text className="text-black font-bold text-center text-lg">Get Started</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress('/(auth)/signup')}
                activeOpacity={0.8}
                className="border border-white/30 py-4 rounded-2xl"
              >
                <Text className="text-white font-semibold text-center text-lg">Create Account</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Decorative dots */}
          <View className="absolute bottom-10 left-0 right-0 flex-row justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <View key={i} className="w-1.5 h-1.5 rounded-full bg-white/30" />
            ))}
          </View>
        </View>

        {/* ---------- Features Section ---------- */}
        <View className="px-6 py-16">
          <Animated.Text
            entering={FadeInUp.delay(100)}
            className="text-4xl font-bold text-white text-center mb-12"
          >
            Why Choose Derash?
          </Animated.Text>

          <View className="gap-6">
            {features.map((feature, idx) => (
              <Animated.View
                key={idx}
                entering={FadeInDown.delay(200 + idx * 100).springify()}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5"
              >
                <View className="flex-row items-center gap-5">
                  <View className="bg-primary/20 p-4 rounded-2xl">{feature.icon}</View>
                  <View className="flex-1">
                    <Text className="text-xl font-semibold text-white">{feature.title}</Text>
                    <Text className="text-gray-300 mt-1 text-sm">{feature.desc}</Text>
                  </View>
                  <ChevronRight color="#00ff9f" size={20} />
                </View>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* ---------- Stats Section with Count Up ---------- */}
        <View ref={statsRef} className="bg-zinc-950/80 py-16 px-6 my-6 rounded-3xl mx-4">
          <View className="flex-row justify-around flex-wrap gap-6">
            {stats.map((stat, i) => (
              <View key={i} className="items-center min-w-[100px]">
                <CountUp
                  target={stat.rawValue}
                  duration={1500}
                  delay={i * 200}
                  suffix={stat.suffix}
                  visible={statsVisible}
                />
                <Text className="text-gray-300 mt-2 text-center font-medium">{stat.label}</Text>
                <View className="flex-row mt-1">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={12} color="#FFD700" fill={s < 4 ? '#FFD700' : 'none'} />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ---------- Trust Badge ---------- */}
        <Animated.View
          entering={FadeInDown.delay(400)}
          className="flex-row justify-center items-center gap-3 mx-6 py-4 border-t border-white/10"
        >
          <TrendingUp color="#00ff9f" size={20} />
          <Text className="text-white/70 text-xs tracking-wide">
            POWERED BY ORIENT TECHNOLOGY PLC • ETHIOPIA'S SMART MOBILITY LEADER
          </Text>
        </Animated.View>

        {/* ---------- Final CTA ---------- */}
        <LinearGradient
          colors={['#0f172a', '#000000']}
          className="mt-12 mx-6 rounded-3xl p-8 mb-10"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-3xl font-bold text-white text-center leading-10">
            Ready to ride with confidence?
          </Text>
          <Text className="text-gray-300 text-center mt-2 mb-8">
            Join thousands of happy riders across Ethiopia
          </Text>
          <TouchableOpacity
            onPress={() => handlePress('/(auth)/login')}
            activeOpacity={0.8}
            className="bg-white py-5 rounded-2xl active:scale-95 transform transition"
          >
            <Text className="text-black text-center font-extrabold text-xl">Join Derash Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------
const features = [
  {
    icon: <Car color="#00ff9f" size={28} />,
    title: 'Instant Rides',
    desc: 'Book a ride in seconds with real-time tracking',
  },
  {
    icon: <MapPin color="#00ff9f" size={28} />,
    title: 'Smart Routes',
    desc: 'Best routes, traffic updates & estimated time',
  },
  {
    icon: <Shield color="#00ff9f" size={28} />,
    title: 'Safe & Secure',
    desc: 'Verified drivers and emergency SOS feature',
  },
  {
    icon: <Award color="#00ff9f" size={28} />,
    title: 'Best Prices',
    desc: 'Transparent pricing with no hidden charges',
  },
];

const stats = [
  { rawValue: 50000, suffix: 'K+', label: 'Happy Riders' },
  { rawValue: 1200, suffix: '', label: 'Active Drivers' },
  { rawValue: 98, suffix: '%', label: 'Satisfaction Rate' },
];




// npx expo install nativewind react-native-reanimated react-native-safe-area-context
// npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo


// npx expo install nativewind react-native-reanimated react-native-safe-area-context
// npx expo install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11 babel-preset-expo







// import { FlashList } from "@shopify/flash-list";
// import { router } from "expo-router";
// import { AlertCircle, MapPinned } from "lucide-react-native";
// import { useMemo } from "react";
// import { StyleSheet, View } from "react-native";

// import {
//   AppHeader,
//   AppText,
//   EmptyState,
//   LoadingSpinner,
//   ScreenWrapper,
//   SearchBar,
// } from "@/components";
// import { TransportMap } from "@/features/map/components/TransportMap";
// import { useCurrentLocation } from "@/features/map/hooks/useCurrentLocation";
// import { TransportCard } from "@/features/transport/components/TransportCard";
// import { useNearbyTransport } from "@/features/transport/hooks/useNearbyTransport";
// import type { TransportOption } from "@/features/transport/types/transport.types";
// import { useAppTheme } from "@/hooks/useAppTheme";
// import { radii, spacing } from "@/theme";

// export default function HomeScreen() {
//   const theme = useAppTheme();
//   const location = useCurrentLocation();
//   const point =
//     location.data?.status === "granted" ? location.data.point : null;
//   const nearby = useNearbyTransport(point);
//   const vehicles = useMemo(
//     () =>
//       (nearby.data ?? [])
//         .filter((item) => item.liveLocation)
//         .map((item) => ({
//           id: item.id,
//           mode: item.mode,
//           routeId: item.routeName,
//           heading: 0,
//           updatedAt: new Date().toISOString(),
//           latitude: item.liveLocation!.latitude,
//           longitude: item.liveLocation!.longitude,
//         })),
//     [nearby.data],
//   );

//   const renderItem = ({ item }: { item: TransportOption }) => (
//     <TransportCard item={item} />
//   );

//   return (
//     <ScreenWrapper scroll={false}>
//       <View style={styles.container}>
//         <View style={styles.headerBlock}>
//           <AppHeader title="Derash" subtitle="Addis Ababa transport, unified" />
//           <SearchBar
//             value=""
//             placeholder="Where are you going?"
//             onChangeText={() => undefined}
//             onPress={() => router.push("/search")}
//           />
//         </View>
//         <View style={[styles.mapShell, { borderColor: theme.colors.border }]}>
//           <TransportMap center={point} vehicles={vehicles} />
//         </View>
//         <View style={styles.sectionHeader}>
//           <AppText variant="subtitle" weight="700">
//             Nearby options
//           </AppText>
//           <AppText muted variant="caption">
//             Live-ready
//           </AppText>
//         </View>
//         {location.data?.status === "denied" ? (
//           <EmptyState
//             title="Location permission needed"
//             message="Enable location to discover nearby buses, minibuses, taxis, and walking routes."
//             icon={MapPinned}
//             actionLabel="Try again"
//             onAction={() => location.refetch()}
//           />
//         ) : nearby.isLoading || location.isLoading ? (
//           <LoadingSpinner />
//         ) : nearby.isError ? (
//           <EmptyState
//             title="Network issue"
//             message="Derash could not load nearby transport. Cached routes will appear when available."
//             icon={AlertCircle}
//             actionLabel="Retry"
//             onAction={() => nearby.refetch()}
//           />
//         ) : (
//           <FlashList
//             data={nearby.data ?? []}
//             keyExtractor={(item) => item.id}
//             renderItem={renderItem}
//             contentContainerStyle={styles.list}
//             ListEmptyComponent={
//               <EmptyState
//                 title="No nearby transport found"
//                 message="Try a wider walking range or search for a destination."
//                 icon={MapPinned}
//               />
//             }
//           />
//         )}
//       </View>
//     </ScreenWrapper>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, gap: spacing.md },
//   headerBlock: { padding: spacing.md, gap: spacing.md },
//   mapShell: {
//     height: 220,
//     borderRadius: radii.lg,
//     overflow: "hidden",
//     borderWidth: 1,
//     marginHorizontal: spacing.md,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.md,
//   },
//   list: { padding: spacing.md },
// });
