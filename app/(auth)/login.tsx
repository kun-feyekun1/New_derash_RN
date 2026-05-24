import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { AppInput, AppText, PrimaryButton, ScreenWrapper } from '@/components';
import { useLogin } from '@/features/auth/hooks/useAuthActions';
import { loginSchema, type LoginFormValues } from '@/features/auth/utils/authSchemas';
import { spacing } from '@/theme';

export default function LoginScreen() {
  const login = useLogin();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '', password: '' }
  });

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.keyboard}>
        <View style={styles.hero}>
          <AppText variant="title" weight="700">
            Derash
          </AppText>
          <AppText muted>
            Move across Addis Ababa with buses, minibuses, taxis, and walking routes in one place.
          </AppText>
        </View>
        <View style={styles.form}>
          <AppInput control={control} name="phoneNumber" label="Phone number" keyboardType="phone-pad" placeholder="0912345678" />
          <AppInput control={control} name="password" label="Password" secureTextEntry placeholder="Password" />
          <PrimaryButton label="Log in" loading={login.isPending} onPress={handleSubmit((values) => login.mutate(values))} />
          <PrimaryButton label="Create account" variant="secondary" onPress={() => router.push('/signup')} />
          <Link href="/forgot-password" asChild>
            <AppText muted style={styles.link}>
              Forgot password?
            </AppText>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  keyboard: { flex: 1, justifyContent: 'space-between', gap: spacing.xl },
  hero: { gap: spacing.sm, paddingTop: spacing.xxl },
  form: { gap: spacing.md },
  link: { textAlign: 'center' }
});
