import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing, typography } from '@/theme';

import { AppText } from './AppText';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
};

export const PrimaryButton = ({ label, onPress, loading, disabled, variant = 'primary', icon: Icon }: Props) => {
  const theme = useAppTheme();
  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary ? theme.colors.primary : variant === 'secondary' ? theme.colors.surfaceMuted : 'transparent';
  const foreground = isPrimary ? '#FFFFFF' : theme.colors.text;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: Boolean(disabled || loading) }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor, opacity: disabled ? 0.5 : pressed ? 0.82 : 1 }
      ]}
    >
      {loading ? (
        <ActivityIndicator color={foreground} />
      ) : (
        <View style={styles.row}>
          {Icon ? <Icon color={foreground} size={20} /> : null}
          <AppText style={{ color: foreground, fontSize: typography.size.md }} weight="700">
            {label}
          </AppText>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs }
});
