import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { spacing } from '@/theme';

export const LoadingSpinner = () => {
  const theme = useAppTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { padding: spacing.lg, alignItems: 'center', justifyContent: 'center' }
});
