import { LogOut, UserRound } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { AppHeader, AppText, PrimaryButton, ScreenWrapper } from '@/components';
import { useLogout } from '@/features/auth/hooks/useAuthActions';
import { useAppSelector } from '@/store/hooks';
import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, shadows, spacing } from '@/theme';

export default function ProfileScreen() {
  const user = useAppSelector((state) => state.auth.user);
  const logout = useLogout();
  const theme = useAppTheme();

  return (
    <ScreenWrapper>
      <AppHeader title="Profile" subtitle="Account, language, safety, and trip preferences." />
      <View style={[styles.card, shadows.card, { backgroundColor: theme.colors.surface }]}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceMuted }]}>
          <UserRound size={32} color={theme.colors.primary} />
        </View>
        <View style={styles.text}>
          <AppText variant="subtitle" weight="700">
            {user?.fullName ?? 'Derash rider'}
          </AppText>
          <AppText muted>{user?.phoneNumber ?? 'Secure account active'}</AppText>
        </View>
      </View>
      <PrimaryButton label="Log out" icon={LogOut} variant="secondary" loading={logout.isPending} onPress={() => logout.mutate()} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radii.lg, padding: spacing.lg, flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: radii.pill, alignItems: 'center', justifyContent: 'center' },
  text: { flex: 1 }
});
