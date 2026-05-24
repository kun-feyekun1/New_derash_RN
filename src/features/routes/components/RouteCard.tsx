import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

import { AppText, PrimaryButton } from '@/components';
import { transportModes } from '@/constants/transport';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, shadows, spacing } from '@/theme';
import { formatCurrency, formatDistance, formatEta } from '@/utils/formatters';

import type { RouteRecommendation } from '../types/route.types';

type Props = {
  route: RouteRecommendation;
};

export const RouteCard = memo(({ route }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={[styles.card, shadows.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <View>
          <AppText weight="700">{route.title}</AppText>
          <AppText muted variant="caption">
            {formatEta(route.totalMinutes)} • {formatCurrency(route.totalFare)}
          </AppText>
        </View>
        <View style={styles.score}>
          <ShieldCheck size={16} color={theme.colors.primary} />
          <AppText variant="caption" weight="700">
            {route.reliabilityScore}%
          </AppText>
        </View>
      </View>
      {route.legs.map((leg) => {
        const Icon = transportModes[leg.mode].icon;
        return (
          <View key={leg.id} style={styles.leg}>
            <Icon color={theme.colors.primary} size={18} />
            <View style={styles.legText}>
              <AppText variant="caption" weight="700">
                {leg.title}
              </AppText>
              <AppText variant="caption" muted>
                {formatEta(leg.durationMinutes)} • {formatDistance(leg.distanceMeters)}
              </AppText>
            </View>
          </View>
        );
      })}
      <PrimaryButton label="Use this route" onPress={() => undefined} />
    </View>
  );
});

RouteCard.displayName = 'RouteCard';

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radii.lg, padding: spacing.md, gap: spacing.md },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  score: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  leg: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  legText: { flex: 1 }
});
