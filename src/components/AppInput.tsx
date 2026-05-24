import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { radii, spacing, typography } from '@/theme';

import { AppText } from './AppText';

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
};

export const AppInput = <T extends FieldValues>({ control, name, label, ...inputProps }: Props<T>) => {
  const theme = useAppTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState }) => (
        <View style={styles.wrap}>
          <AppText variant="caption" weight="600">
            {label}
          </AppText>
          <TextInput
            {...inputProps}
            value={String(value ?? '')}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholderTextColor={theme.colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.surface,
                color: theme.colors.text,
                borderColor: fieldState.error ? theme.colors.danger : theme.colors.border
              }
            ]}
          />
          {fieldState.error ? (
            <AppText variant="caption" style={{ color: theme.colors.danger }}>
              {fieldState.error.message}
            </AppText>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.size.md
  }
});
