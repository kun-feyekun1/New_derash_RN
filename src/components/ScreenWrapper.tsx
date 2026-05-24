import { useEffect, type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme';

type Props = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}>;

export const ScreenWrapper = ({ children, scroll = true, padded = true, style }: Props) => {
  const theme = useAppTheme();
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const contentStyle = [styles.content, padded && styles.padded, style];

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 180 });
  }, [opacity]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {scroll ? (
        <Animated.View style={[styles.fill, animatedStyle]}>
          <ScrollView
            style={styles.fill}
            contentContainerStyle={contentStyle}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </Animated.View>
      ) : (
        <Animated.View style={[styles.fill, animatedStyle]}>
          <View style={contentStyle}>{children}</View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  fill: { flex: 1 },
  content: { flexGrow: 1 },
  padded: { padding: spacing.md, gap: spacing.md }
});
