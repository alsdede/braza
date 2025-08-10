import * as Localization from 'expo-localization';

export type SupportedLanguage = 'en' | 'pt' | 'es';

/**
 * Get the device's current language code
 * @returns The language code (e.g., 'en', 'pt', 'es')
 */
export const getDeviceLanguage = (): SupportedLanguage => {
  const locales = Localization.getLocales();
  const primaryLocale = locales[0];
  
  if (!primaryLocale) {
    return 'en'; // Default fallback
  }

  // Extract language code from locale (e.g., 'pt-BR' -> 'pt')
  const languageCode = primaryLocale.languageCode?.toLowerCase();
  
  // Map to supported languages
  switch (languageCode) {
    case 'pt':
      return 'pt';
    case 'es':
      return 'es';
    case 'en':
    default:
      return 'en';
  }
};

/**
 * Get the full locale string (e.g., 'en-US', 'pt-BR')
 * @returns The full locale string
 */
export const getDeviceLocale = (): string => {
  const locales = Localization.getLocales();
  return locales[0]?.languageTag || 'en-US';
};

/**
 * Check if the app should use RTL layout
 * @returns True if the current locale uses RTL layout
 */
export const isRTL = (): boolean => {
  const locales = Localization.getLocales();
  return locales[0]?.textDirection === 'rtl';
};

/**
 * Get the currency for the current locale
 * @returns The currency code (e.g., 'USD', 'BRL', 'EUR')
 */
export const getLocaleCurrency = (): string => {
  const locales = Localization.getLocales();
  return locales[0]?.currencyCode || 'USD';
};
