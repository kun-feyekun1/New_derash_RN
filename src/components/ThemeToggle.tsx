import { Pressable, StyleSheet, View } from 'react-native';
import { Moon, Smartphone, Sun } from 'lucide-react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { setThemePreference, type ThemePreference } from '@/store/themeSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { radii, spacing } from '@/theme';

import { AppText } from './AppText';

const options: Array<{ value: ThemePreference; label: string; icon: typeof Sun }> = [
  { value: 'system', label: 'System', icon: Smartphone },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon }
];

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.theme.preference);
  const theme = useAppTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: theme.colors.surfaceMuted }]}>
      {options.map((option) => {
        const Icon = option.icon;
        const active = selected === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="button"
            onPress={() => dispatch(setThemePreference(option.value))}
            style={[styles.option, active && { backgroundColor: theme.colors.surface }]}
          >
            <Icon size={16} color={active ? theme.colors.primary : theme.colors.textMuted} />
            <AppText variant="caption" weight={active ? '700' : '400'}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', borderRadius: radii.lg, padding: spacing.xxs, gap: spacing.xxs },
  option: {
    flex: 1,
    minHeight: 42,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs
  }
});
