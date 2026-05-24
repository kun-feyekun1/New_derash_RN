import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { AppHeader, AppInput, PrimaryButton, ScreenWrapper } from '@/components';
import { useSignup } from '@/features/auth/hooks/useAuthActions';
import { signupSchema, type SignupFormValues } from '@/features/auth/utils/authSchemas';
import { spacing } from '@/theme';

export default function SignupScreen() {
  const signup = useSignup();
  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', phoneNumber: '', email: '', password: '' }
  });

  return (
    <ScreenWrapper>
      <AppHeader title="Create account" subtitle="A secure Derash account keeps trips, tickets, and routes together." showActions={false} />
      <View style={styles.form}>
        <AppInput control={control} name="fullName" label="Full name" placeholder="Your name" />
        <AppInput control={control} name="phoneNumber" label="Phone number" keyboardType="phone-pad" placeholder="0912345678" />
        <AppInput control={control} name="email" label="Email" keyboardType="email-address" placeholder="you@example.com" />
        <AppInput control={control} name="password" label="Password" secureTextEntry placeholder="At least 8 characters" />
        <PrimaryButton label="Continue" loading={signup.isPending} onPress={handleSubmit((values) => signup.mutate(values))} />
        <PrimaryButton label="Back to login" variant="ghost" onPress={() => router.back()} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.md } });
