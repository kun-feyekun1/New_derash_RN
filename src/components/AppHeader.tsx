import { Pressable, StyleSheet, View } from 'react-native';
import { Bell, Settings } from 'lucide-react-native';
import { router } from 'expo-router';

import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing } from '@/theme';

import { AppText } from './AppText';

type Props = {
  title: string;
  subtitle?: string;
  showActions?: boolean;
};

export const AppHeader = ({ title, subtitle, showActions = true }: Props) => {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <View style={styles.title}>
        <AppText variant="title" weight="700">
          {title}
        </AppText>
        {subtitle ? (
          <AppText muted variant="caption">
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {showActions ? (
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/notifications')}
            style={[styles.iconButton, { backgroundColor: theme.colors.surface }]}
          >
            <Bell color={theme.colors.text} size={20} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push('/settings')}
            style={[styles.iconButton, { backgroundColor: theme.colors.surface }]}
          >
            <Settings color={theme.colors.text} size={20} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  title: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.xs },
  iconButton: { width: 42, height: 42, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center' }
});
