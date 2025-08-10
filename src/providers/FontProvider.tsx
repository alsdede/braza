import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { fontFamilies } from '../constants/typography';
import { colors } from '../constants/colors';
import { Text } from '../components/ui';

interface FontProviderProps {
  children: React.ReactNode;
}

export const FontProvider: React.FC<FontProviderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync(fontFamilies);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Em caso de erro, permite que o app continue sem as fontes customizadas
        setFontsLoaded(true);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Você pode retornar um loading screen aqui se quiser
    return <View style={{ flex: 1 }} />;
  }

  return <>{children}</>;
};
