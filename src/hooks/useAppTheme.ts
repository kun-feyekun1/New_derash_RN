import { useColorScheme } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors } from '@/theme';

export const useAppTheme = () => {
  const systemScheme = useColorScheme();
  const preference = useAppSelector((state) => state.theme.preference);
  const scheme = (preference === 'system' ? (systemScheme ?? 'light') : preference) as 'light' | 'dark';
  

  return {
    scheme,
    colors: colors[scheme],
    isDark: scheme === 'dark'
  };
};
