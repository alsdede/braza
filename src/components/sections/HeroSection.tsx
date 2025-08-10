import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { HeroSection as HeroSectionType } from '../../types/sanity';

interface HeroSectionProps {
  section: HeroSectionType;
}

export default function HeroSection({ section }: HeroSectionProps) {
  if (!section.isActive) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{section.title}</Text>
      {section.subtitle && (
        <Text style={styles.subtitle}>{section.subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#007AFF',
    marginVertical: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F4FF',
    textAlign: 'center',
    lineHeight: 22,
  },
});
