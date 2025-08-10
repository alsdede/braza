import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EstablishmentList from '../../src/components/EstablishmentList';
import { Establishment } from '../../src/types/sanity';

export default function CouponsScreen() {
  const handleEstablishmentPress = (establishment: Establishment) => {
    // TODO: Navegar para detalhes do estabelecimento ou página de cupons específicos
    console.log('Estabelecimento selecionado:', establishment.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cupons</Text>
        <Text style={styles.subtitle}>Descubra ofertas exclusivas</Text>
      </View>
      <EstablishmentList onEstablishmentPress={handleEstablishmentPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E73',
  },
});
