// Typography configuration for the Braza app
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

// Font families
export const fontFamilies = {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
};

// Font weights mapping
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

// Font sizes
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
  '6xl': 48,
} as const;

// Line heights
export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Typography styles
export const typography = {
  // Headings
  h1: {
    fontFamily: 'Inter_700Bold',
    fontSize: fontSizes['4xl'],
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
    fontWeight: fontWeights.bold,
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
    fontWeight: fontWeights.semibold,
  },
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes['2xl'],
    lineHeight: fontSizes['2xl'] * lineHeights.normal,
    fontWeight: fontWeights.semibold,
  },
  h4: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.xl,
    lineHeight: fontSizes.xl * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
  h5: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
  h6: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
  
  // Body text
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.relaxed,
    fontWeight: fontWeights.regular,
  },
  bodyLarge: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.relaxed,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.relaxed,
    fontWeight: fontWeights.regular,
  },
  
  // Captions and labels
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.normal,
    fontWeight: fontWeights.regular,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
  
  // Interactive elements
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.tight,
    fontWeight: fontWeights.semibold,
  },
  buttonLarge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.tight,
    fontWeight: fontWeights.semibold,
  },
  buttonSmall: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.tight,
    fontWeight: fontWeights.medium,
  },
  
  // Navigation
  navTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.tight,
    fontWeight: fontWeights.semibold,
  },
  tabLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.xs,
    lineHeight: fontSizes.xs * lineHeights.tight,
    fontWeight: fontWeights.medium,
  },
  
  // Cards and lists
  cardTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    fontWeight: fontWeights.semibold,
  },
  cardSubtitle: {
    fontFamily: 'Inter_500Medium',
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
  
  // Special text
  price: {
    fontFamily: 'Inter_700Bold',
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.tight,
    fontWeight: fontWeights.bold,
  },
  rating: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.tight,
    fontWeight: fontWeights.semibold,
  },
};

export default typography;
