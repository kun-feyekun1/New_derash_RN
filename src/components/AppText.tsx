import { Text, type TextProps } from 'react-native';

import { useAppTheme } from '@/hooks/useAppTheme';
import { typography } from '@/theme';

type Props = TextProps & {
  variant?: 'title' | 'subtitle' | 'body' | 'caption';
  muted?: boolean;
  weight?: '400' | '600' | '700';
};

export const AppText = ({ variant = 'body', muted, weight = '400', style, ...props }: Props) => {
  const theme = useAppTheme();
  const size =
    variant === 'title'
      ? typography.size.xl
      : variant === 'subtitle'
        ? typography.size.lg
        : variant === 'caption'
          ? typography.size.sm
          : typography.size.md;

  return (
    <Text
      {...props}
      style={[
        {
          color: muted ? theme.colors.textMuted : theme.colors.text,
          fontSize: size,
          lineHeight: size + 6,
          fontWeight: weight
        },
        style
      ]}
    />
  );
};
