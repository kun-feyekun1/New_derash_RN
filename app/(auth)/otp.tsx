import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppHeader, AppInput, PrimaryButton, ScreenWrapper } from '@/components';
import { useVerifyOtp } from '@/features/auth/hooks/useAuthActions';
import { otpSchema, type OtpFormValues } from '@/features/auth/utils/authSchemas';
import { spacing } from '@/theme';

export default function OtpScreen() {
  const verify = useVerifyOtp();
  const { control, handleSubmit } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { code: '' }
  });

  return (
    <ScreenWrapper>
      <AppHeader title="Verify phone" subtitle="Enter the 6 digit code sent to your phone." showActions={false} />
      <View style={styles.form}>
        <AppInput control={control} name="code" label="Verification code" keyboardType="number-pad" maxLength={6} />
        <PrimaryButton label="Verify" loading={verify.isPending} onPress={handleSubmit((values) => verify.mutate(values))} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.md } });
