// Theme colors for the Braza app
export const colors = {
  // Primary colors
  primary: '#E95300', // Orange primary
  primaryLight: '#FF8A4C',
  primaryDark: '#D4530C',
  
  // Secondary colors
  secondary: '#000000', // Black secondary
  secondaryLight: '#333333',
  secondaryDark: '#000000',
  
  // Neutral colors
  white: '#FFFFFF',
  gray: {
    50: '#F8F9FA',
    100: '#F1F3F4',
    200: '#E8EAED',
    300: '#DADCE0',
    400: '#BDC1C6',
    500: '#9AA0A6',
    600: '#80868B',
    700: '#5F6368',
    800: '#3C4043',
    900: '#202124',
  },
  
  // Status colors
  success: '#34C759',
  warning: '#FFD60A',
  error: '#FF3B30',
  info: '#007AFF',
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F1F3F4',
  },
  
  // Text colors
  text: {
    primary: '#202124',
    secondary: '#5F6368',
    tertiary: '#9AA0A6',
    inverse: '#FFFFFF',
    link: '#007AFF',
  },
  
  // Border colors
  border: {
    light: '#E8EAED',
    medium: '#DADCE0',
    dark: '#BDC1C6',
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  },
  
  // Social media brand colors
  social: {
    facebook: '#1877F2',
    instagram: '#E4405F',
    twitter: '#1DA1F2',
    linkedin: '#0077B5',
    youtube: '#FF0000',
    whatsapp: '#25D366',
  },
  
  // Rating colors
  rating: {
    star: '#FFD700',
    background: '#F1F3F4',
  },
  
  // Category colors (for establishments)
  category: {
    restaurant: '#F26419',
    bar: '#8B5CF6',
    cafe: '#A78BFA',
    hotel: '#06B6D4',
    shop: '#10B981',
    attraction: '#F59E0B',
    services: '#6366F1',
    entertainment: '#EC4899',
    other: '#6B7280',
  },
};

// Typography colors specifically
export const typography = {
  heading: colors.text.primary,
  body: colors.text.secondary,
  caption: colors.text.tertiary,
  link: colors.text.link,
  inverse: colors.text.inverse,
  primary: colors.primary,
  secondary: colors.secondary,
};

// Themed color schemes
export const themes = {
  light: {
    ...colors,
    background: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F4',
    },
  },
  // Future dark theme support
  dark: {
    ...colors,
    background: {
      primary: '#121212',
      secondary: '#1E1E1E',
      tertiary: '#2C2C2C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      inverse: '#000000',
      link: '#4FC3F7',
    },
  },
};

export default colors;
