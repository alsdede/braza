import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

// Define text variants based on our typography system
export type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'body' 
  | 'bodyLarge' 
  | 'bodySmall' 
  | 'caption' 
  | 'button' 
  | 'buttonLarge'
  | 'buttonSmall'
  | 'label'
  | 'cardTitle'
  | 'cardSubtitle'
  | 'navTitle'
  | 'tabLabel'
  | 'price'
  | 'rating';

// Define color variants
export type TextColor = 
  | 'primary' 
  | 'secondary' 
  | 'tertiary' 
  | 'inverse' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'link'
  | 'white'
  | 'black';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'bold' | 'light' | 'medium' | 'semibold';
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight,
  style,
  children,
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return typography.h1;
      case 'h2':
        return typography.h2;
      case 'h3':
        return typography.h3;
      case 'h4':
        return typography.h4;
      case 'h5':
        return typography.h5;
      case 'h6':
        return typography.h6;
      case 'body':
        return typography.body;
      case 'bodyLarge':
        return typography.bodyLarge;
      case 'bodySmall':
        return typography.bodySmall;
      case 'caption':
        return typography.caption;
      case 'button':
        return typography.button;
      case 'buttonLarge':
        return typography.buttonLarge;
      case 'buttonSmall':
        return typography.buttonSmall;
      case 'label':
        return typography.label;
      case 'cardTitle':
        return typography.cardTitle;
      case 'cardSubtitle':
        return typography.cardSubtitle;
      case 'navTitle':
        return typography.navTitle;
      case 'tabLabel':
        return typography.tabLabel;
      case 'price':
        return typography.price;
      case 'rating':
        return typography.rating;
      default:
        return typography.body;
    }
  };

  const getColorStyle = () => {
    switch (color) {
      case 'primary':
        return { color: colors.text.primary };
      case 'secondary':
        return { color: colors.text.secondary };
      case 'tertiary':
        return { color: colors.text.tertiary };
      case 'inverse':
        return { color: colors.text.inverse };
      case 'success':
        return { color: colors.success };
      case 'warning':
        return { color: colors.warning };
      case 'error':
        return { color: colors.error };
      case 'info':
        return { color: colors.info };
      case 'link':
        return { color: colors.text.link };
      case 'white':
        return { color: colors.white };
      case 'black':
        return { color: colors.secondary };
      default:
        return { color: colors.text.primary };
    }
  };

  const getWeightStyle = () => {
    if (!weight) return {};
    
    switch (weight) {
      case 'light':
        return { fontFamily: 'Inter_300Light' };
      case 'normal':
        return { fontFamily: 'Inter_400Regular' };
      case 'medium':
        return { fontFamily: 'Inter_500Medium' };
      case 'semibold':
        return { fontFamily: 'Inter_600SemiBold' };
      case 'bold':
        return { fontFamily: 'Inter_700Bold' };
      default:
        return {};
    }
  };

  const getAlignStyle = () => {
    return { textAlign: align };
  };

  const combinedStyle = [
    getVariantStyle(),
    getColorStyle(),
    getWeightStyle(),
    getAlignStyle(),
    style,
  ];

  return (
    <RNText style={combinedStyle} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
