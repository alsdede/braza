import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import Text from './Text';

// Define button variants
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'link'
  | 'success'
  | 'warning'
  | 'error';

// Define button sizes
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderWidth: 1,
    };

    // Size styles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        minHeight: 32,
      },
      medium: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 44,
      },
      large: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      link: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 0,
        minHeight: 'auto',
      },
      success: {
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
      warning: {
        backgroundColor: colors.warning,
        borderColor: colors.warning,
      },
      error: {
        backgroundColor: colors.error,
        borderColor: colors.error,
      },
    };

    // Disabled styles
    const disabledStyle: ViewStyle = disabled ? {
      opacity: 0.5,
    } : {};

    // Full width style
    const fullWidthStyle: ViewStyle = fullWidth ? {
      width: '100%',
    } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...disabledStyle,
      ...fullWidthStyle,
    };
  };

  const getTextColor = (): string => {
    if (disabled) {
      return colors.text.tertiary;
    }

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'success':
      case 'error':
        return colors.white;
      case 'warning':
        return colors.secondary;
      case 'outline':
      case 'ghost':
        return colors.primary;
      case 'link':
        return colors.text.link;
      default:
        return colors.white;
    }
  };

  const getTextVariant = () => {
    switch (size) {
      case 'small':
        return 'buttonSmall';
      case 'large':
        return 'buttonLarge';
      default:
        return 'button';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={getTextColor()} 
          size={size === 'small' ? 'small' : 'small'} 
        />
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: 8 }}>
            {icon}
          </View>
        )}
        
        <Text
          variant={getTextVariant() as any}
          style={[
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {children}
        </Text>
        
        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: 8 }}>
            {icon}
          </View>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
