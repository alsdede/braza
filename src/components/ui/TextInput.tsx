import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';
import Text from './Text';

// Define input variants
export type TextInputVariant = 
  | 'default'
  | 'outlined'
  | 'filled'
  | 'underlined';

// Define input sizes
export type TextInputSize = 'small' | 'medium' | 'large';

// Define input states
export type TextInputState = 'default' | 'focus' | 'error' | 'success' | 'disabled';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  variant?: TextInputVariant;
  size?: TextInputSize;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  characterLimit?: number;
  showCharacterCount?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  onValidate?: (value: string) => string | null; // Returns error message or null
}

export interface TextInputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
  validate: () => boolean;
}

export const TextInput = forwardRef<TextInputRef, TextInputProps>(({
  variant = 'outlined',
  size = 'medium',
  label,
  placeholder,
  helperText,
  errorText,
  successText,
  leftIcon,
  rightIcon,
  required = false,
  disabled = false,
  loading = false,
  characterLimit,
  showCharacterCount = false,
  value,
  onChangeText,
  onFocus,
  onBlur,
  onValidate,
  style,
  inputStyle,
  labelStyle,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<RNTextInput>(null);
  const labelAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => {
      setInputValue('');
      onChangeText?.('');
    },
    getValue: () => inputValue,
    validate: () => {
      if (onValidate) {
        const error = onValidate(inputValue);
        setValidationError(error);
        return !error;
      }
      return true;
    },
  }));

  const getCurrentState = (): TextInputState => {
    if (disabled) return 'disabled';
    if (errorText || validationError) return 'error';
    if (successText) return 'success';
    if (isFocused) return 'focus';
    return 'default';
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (label && variant !== 'underlined') {
      Animated.timing(labelAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (label && variant !== 'underlined' && !inputValue) {
      Animated.timing(labelAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    
    // Validate on blur
    if (onValidate) {
      const error = onValidate(inputValue);
      setValidationError(error);
    }
    
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    // Character limit enforcement
    if (characterLimit && text.length > characterLimit) {
      return;
    }
    
    setInputValue(text);
    onChangeText?.(text);
    
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'relative',
    };

    const sizeStyles: Record<TextInputSize, ViewStyle> = {
      small: {
        minHeight: 40,
      },
      medium: {
        minHeight: 48,
      },
      large: {
        minHeight: 56,
      },
    };

    const currentState = getCurrentState();
    const variantStyles: Record<TextInputVariant, ViewStyle> = {
      default: {
        backgroundColor: colors.background.secondary,
        borderRadius: 8,
        paddingHorizontal: 12,
      },
      outlined: {
        backgroundColor: colors.background.primary,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: currentState === 'focus' ? colors.primary : 
                    currentState === 'error' ? colors.error :
                    currentState === 'success' ? colors.success :
                    colors.border.medium,
        paddingHorizontal: 12,
      },
      filled: {
        backgroundColor: colors.background.secondary,
        borderRadius: 8,
        borderBottomWidth: 2,
        borderBottomColor: currentState === 'focus' ? colors.primary : 
                          currentState === 'error' ? colors.error :
                          currentState === 'success' ? colors.success :
                          colors.border.medium,
        paddingHorizontal: 12,
      },
      underlined: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: currentState === 'focus' ? colors.primary : 
                          currentState === 'error' ? colors.error :
                          currentState === 'success' ? colors.success :
                          colors.border.medium,
        paddingHorizontal: 0,
        borderRadius: 0,
      },
    };

    const stateStyles: Record<TextInputState, ViewStyle> = {
      default: {},
      focus: {},
      error: {},
      success: {},
      disabled: {
        opacity: 0.6,
        backgroundColor: colors.background.tertiary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...stateStyles[currentState],
    };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      ...typography.body,
      color: disabled ? colors.text.tertiary : colors.text.primary,
      paddingVertical: 0,
    };

    const sizeStyles: Record<TextInputSize, TextStyle> = {
      small: {
        fontSize: 14,
        lineHeight: 20,
      },
      medium: {
        fontSize: 16,
        lineHeight: 24,
      },
      large: {
        fontSize: 18,
        lineHeight: 28,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
    };
  };

  const getLabelStyle = () => {
    if (variant === 'underlined') {
      return {
        ...typography.label,
        color: getCurrentState() === 'error' ? colors.error : 
               getCurrentState() === 'focus' ? colors.primary : 
               colors.text.secondary,
        marginBottom: 8,
      };
    }

    // Floating label for other variants
    const isFloating = isFocused || inputValue;
    return {
      position: 'absolute' as const,
      left: 12,
      backgroundColor: variant === 'outlined' ? colors.background.primary : 'transparent',
      paddingHorizontal: 4,
      fontSize: isFloating ? 12 : 16,
      color: getCurrentState() === 'error' ? colors.error : 
             getCurrentState() === 'focus' ? colors.primary : 
             colors.text.secondary,
      zIndex: 1,
    };
  };

  const renderLabel = () => {
    if (!label) return null;

    if (variant === 'underlined') {
      return (
        <Text variant="label" style={[getLabelStyle(), labelStyle]}>
          {label}{required && <Text color="error"> *</Text>}
        </Text>
      );
    }

    // Floating label
    return (
      <Animated.Text
        style={[
          getLabelStyle(),
          {
            top: labelAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [size === 'large' ? 16 : size === 'medium' ? 12 : 8, -8],
            }),
          },
          labelStyle,
        ]}
      >
        {label}{required && <Text color="error"> *</Text>}
      </Animated.Text>
    );
  };

  const renderHelperText = () => {
    const text = errorText || validationError || successText || helperText;
    if (!text && !showCharacterCount) return null;

    return (
      <View style={styles.helperContainer}>
        {text && (
          <Text
            variant="caption"
            color={
              errorText || validationError ? 'error' :
              successText ? 'success' :
              'secondary'
            }
            style={styles.helperText}
          >
            {text}
          </Text>
        )}
        
        {showCharacterCount && characterLimit && (
          <Text variant="caption" color="tertiary" style={styles.characterCount}>
            {inputValue.length}/{characterLimit}
          </Text>
        )}
      </View>
    );
  };

  const renderIcons = () => {
    if (!leftIcon && !rightIcon) return null;

    return (
      <>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderLabel()}
      
      <View style={[getContainerStyle(), { flexDirection: 'row', alignItems: 'center' }]}>
        {renderIcons()}
        
        <RNTextInput
          ref={inputRef}
          style={[getInputStyle(), inputStyle]}
          value={inputValue}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.text.tertiary}
          editable={!disabled && !loading}
          {...props}
        />
      </View>
      
      {renderHelperText()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  helperText: {
    flex: 1,
  },
  characterCount: {
    marginLeft: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

TextInput.displayName = 'TextInput';

export default TextInput;
