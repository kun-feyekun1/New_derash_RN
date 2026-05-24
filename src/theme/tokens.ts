export const colors = {
  light: {
    background: '#F7F8F5',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF2EC',
    text: '#10201A',
    textMuted: '#5D6F67',
    border: '#DDE5DF',
    primary: '#1B8A5A',
    primaryPressed: '#146A45',
    accent: '#F2B84B',
    danger: '#C94F43',
    info: '#4F8DB7',
    success: '#1B8A5A',
    taxi: '#F2B84B',
    bus: '#1B8A5A',
    minibus: '#4F8DB7',
    walking: '#C9653F',
    rail: '#6D5BD0',
    overlay: 'rgba(16, 32, 26, 0.42)'
  },
  dark: {
    background: '#07130F',
    surface: '#10201A',
    surfaceMuted: '#173328',
    text: '#F7F8F5',
    textMuted: '#B7C4BC',
    border: '#2B463A',
    primary: '#39B979',
    primaryPressed: '#2EA568',
    accent: '#F2B84B',
    danger: '#F07467',
    info: '#7AB2D4',
    success: '#39B979',
    taxi: '#F2B84B',
    bus: '#39B979',
    minibus: '#7AB2D4',
    walking: '#E08762',
    rail: '#9A8CFF',
    overlay: 'rgba(0, 0, 0, 0.58)'
  }
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999
} as const;

export const typography = {
  family: {
    regular: 'System',
    medium: 'System',
    bold: 'System'
  },
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 28,
    xxl: 36
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 36,
    xxl: 44
  }
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  floating: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8
  }
} as const;
