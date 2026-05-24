import { StyleSheet, View } from 'react-native';
import { Navigation } from 'lucide-react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing } from '@/theme';

import { AppText } from './AppText';

type Props = {
  title: string;
  subtitle: string;
};

export const MapMarkerCard = ({ title, subtitle }: Props) => {
  const theme = useAppTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Navigation size={16} color={theme.colors.primary} />
      <View style={styles.text}>
        <AppText variant="caption" weight="700" numberOfLines={1}>
          {title}
        </AppText>
        <AppText variant="caption" muted numberOfLines={1}>
          {subtitle}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: 150,
    borderWidth: 1,
    borderRadius: radii.md,
    padding: spacing.xs,
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center'
  },
  text: { flex: 1 }
});
