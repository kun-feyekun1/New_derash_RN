import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Heart } from 'lucide-react-native';

import { AppText } from '@/components';
import { transportModes } from '@/constants/transport';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { spacing, radii, shadows } from '@/theme';
import { formatCurrency, formatEta } from '@/utils/formatters';

import { toggleFavoriteRoute } from '../state/transportSlice';
import type { TransportOption } from '../types/transport.types';

type Props = {
  item: TransportOption;
  onPress?: (item: TransportOption) => void;
};

export const TransportCard = memo(({ item, onPress }: Props) => {
  const theme = useAppTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.transport.favoriteRouteIds);
  const favorite = favorites.includes(item.id) || item.favorite;
  const meta = transportModes[item.mode];
  const Icon = meta.icon;
  const modeColor = theme.colors[item.mode === 'rail' ? 'rail' : item.mode];

  const crowding = useMemo(
    () => (item.crowdingLevel === 'low' ? 'Comfortable' : item.crowdingLevel === 'medium' ? 'Busy' : 'Packed'),
    [item.crowdingLevel]
  );

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress?.(item)}
      style={[styles.card, shadows.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
    >
      <View style={[styles.icon, { backgroundColor: `${modeColor}22` }]}>
        <Icon color={modeColor} size={24} />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <AppText weight="700" numberOfLines={1}>
            {item.routeName}
          </AppText>
          <AppText variant="caption" weight="700" style={{ color: theme.colors.primary }}>
            {formatEta(item.etaMinutes)}
          </AppText>
        </View>
        <AppText muted variant="caption" numberOfLines={1}>
          {item.originName} to {item.destinationName}
        </AppText>
        <View style={styles.metaRow}>
          <AppText variant="caption">{formatCurrency(item.fareEstimate)}</AppText>
          <AppText muted variant="caption">
            {item.walkingMinutesToStop} min walk
          </AppText>
          <AppText muted variant="caption">
            {crowding}
          </AppText>
        </View>
      </View>
      <Pressable
        accessibilityRole="button"
        onPress={() => dispatch(toggleFavoriteRoute(item.id))}
        style={styles.favorite}
      >
        <Heart size={20} color={favorite ? theme.colors.danger : theme.colors.textMuted} fill={favorite ? theme.colors.danger : 'transparent'} />
      </Pressable>
    </Pressable>
  );
});

TransportCard.displayName = 'TransportCard';

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radii.lg, padding: spacing.md, flexDirection: 'row', gap: spacing.md },
  icon: { width: 48, height: 48, borderRadius: radii.lg, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, gap: spacing.xs },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  favorite: { padding: spacing.xs }
});
