import { Modal, Pressable, StyleSheet, View, type ModalProps } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing } from '@/theme';

type Props = ModalProps & {
  onClose: () => void;
};

export const AppModal = ({ children, onClose, ...props }: Props) => {
  const theme = useAppTheme();

  return (
    <Modal transparent animationType="fade" {...props}>
      <Pressable style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: theme.colors.surface }]}>{children}</Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', padding: spacing.md },
  sheet: { borderRadius: radii.lg, padding: spacing.md, gap: spacing.md }
});
