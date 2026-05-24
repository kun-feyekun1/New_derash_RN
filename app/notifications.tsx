import { Bell } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppHeader, AppText, EmptyState, LoadingSpinner, ScreenWrapper } from '@/components';
import { useNotifications } from '@/features/profile/hooks/useNotifications';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing } from '@/theme';

export default function NotificationsScreen() {
  const notifications = useNotifications();
  const theme = useAppTheme();

  return (
    <ScreenWrapper>
      <AppHeader title="Notifications" subtitle="Service alerts, ETA changes, and payment updates." showActions={false} />
      {notifications.isLoading ? (
        <LoadingSpinner />
      ) : notifications.isError ? (
        <EmptyState title="Could not load alerts" message="Retry when your connection improves." icon={Bell} actionLabel="Retry" onAction={() => notifications.refetch()} />
      ) : notifications.data?.length ? (
        notifications.data.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <AppText weight="700">{item.title}</AppText>
            <AppText muted>{item.body}</AppText>
          </View>
        ))
      ) : (
        <EmptyState title="No notifications" message="Trip and service updates will appear here." icon={Bell} />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: radii.lg, padding: spacing.md, gap: spacing.xs }
});
