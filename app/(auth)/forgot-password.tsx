import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppHeader, AppInput, PrimaryButton, ScreenWrapper } from '@/components';
import { authService } from '@/features/auth/services/authService';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/features/auth/utils/authSchemas';
import { useAppDispatch } from '@/store/hooks';
import { showToast } from '@/store/toastSlice';
import { spacing } from '@/theme';

export default function ForgotPasswordScreen() {
  const dispatch = useAppDispatch();
  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      dispatch(showToast('Password reset instructions sent.', 'success'));
      router.back();
    }
  });
  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phoneNumber: '' }
  });

  return (
    <ScreenWrapper>
      <AppHeader title="Reset password" subtitle="We will send recovery instructions if the number exists." showActions={false} />
      <View style={styles.form}>
        <AppInput control={control} name="phoneNumber" label="Phone number" keyboardType="phone-pad" />
        <PrimaryButton label="Send instructions" loading={mutation.isPending} onPress={handleSubmit((values) => mutation.mutate(values))} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.md } });
