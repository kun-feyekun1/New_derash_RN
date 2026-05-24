import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { hideToast } from '@/store/toastSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { radii, shadows, spacing } from '@/theme';

import { AppText } from './AppText';

export const ToastMessage = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast.active);
  const theme = useAppTheme();

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = setTimeout(() => dispatch(hideToast()), 3500);
    return () => clearTimeout(timer);
  }, [dispatch, toast]);

  if (!toast) {
    return null;
  }

  const color =
    toast.kind === 'error' ? theme.colors.danger : toast.kind === 'success' ? theme.colors.success : theme.colors.info;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View style={[styles.toast, shadows.floating, { backgroundColor: theme.colors.surface, borderColor: color }]}>
        <AppText weight="700">{toast.message}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    zIndex: 30
  },
  toast: {
    borderLeftWidth: 4,
    borderRadius: radii.md,
    padding: spacing.md
  }
});
