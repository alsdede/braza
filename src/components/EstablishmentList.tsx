import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Establishment } from '../types/sanity';
import { getEstablishments } from '../services/sanity';
import { urlFor } from '../lib/sanity';
import { getSanityImageUrl } from '../utils/sanityImage';

const { width } = Dimensions.get('window');

interface EstablishmentListProps {
  // Remove onEstablishmentPress pois não precisamos mais
}

interface EstablishmentCardProps {
  establishment: Establishment;
}

const EstablishmentCard: React.FC<EstablishmentCardProps> = ({
  establishment,
}) => {
  const mainImage = establishment.featuredImage;
  const imageUrl = mainImage ? getSanityImageUrl(mainImage) : null;

  return (
    <Link href={`/establishment/${establishment._id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <View style={styles.cardContent}>
          {/* Imagem Principal */}
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.establishmentImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialIcons name="image" size={40} color="#ccc" />
              </View>
            )}
          </View>

          {/* Informações do Estabelecimento */}
          <View style={styles.infoContainer}>
            <View style={styles.headerInfo}>
              <Text style={styles.establishmentName} numberOfLines={2}>
                {establishment.name}
              </Text>
              {/* {establishment.rating && (
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>
                    {establishment.rating.toFixed(1)}
                  </Text>
                </View>
              )} */}
            </View>

            {/* Categoria e Subcategoria */}
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                {establishment.category}
                {establishment.subCategory && ` • ${establishment.subCategory}`}
              </Text>
            </View>

            {/* Localização */}
            {establishment.location?.address && (
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={14} color="#666" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {establishment.location.address}
                </Text>
              </View>
            )}

            {/* Tags/Características */}
            {/* {establishment.features && establishment.features.length > 0 && (
              <View style={styles.tagsContainer}>
                {establishment.features.slice(0, 3).map((feature: string, index: number) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{feature}</Text>
                  </View>
                ))}
                {establishment.features.length > 3 && (
                  <Text style={styles.moreTagsText}>
                    +{establishment.features.length - 3}
                  </Text>
                )}
              </View>
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const EstablishmentList: React.FC<EstablishmentListProps> = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEstablishments = async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      setError(null);
      const data = await getEstablishments(undefined, 100); // Carrega mais estabelecimentos
      setEstablishments(data);
      setFilteredEstablishments(data);
    } catch (err) {
      console.error('Erro ao carregar estabelecimentos:', err);
      setError('Erro ao carregar estabelecimentos. Tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEstablishments();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEstablishments(establishments);
    } else {
      const filtered = establishments.filter((establishment) =>
        establishment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        establishment.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        establishment.subCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        establishment.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEstablishments(filtered);
    }
  }, [searchQuery, establishments]);

  const renderEstablishment = ({ item }: { item: Establishment }) => (
    <EstablishmentCard establishment={item} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Input de Pesquisa */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar estabelecimentos..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <AntDesign name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contador de Resultados */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {filteredEstablishments.length} estabelecimento{filteredEstablishments.length !== 1 ? 's' : ''} encontrado{filteredEstablishments.length !== 1 ? 's' : ''}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando estabelecimentos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error-outline" size={48} color="#FF3B30" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => loadEstablishments()}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredEstablishments}
        renderItem={renderEstablishment}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadEstablishments(true)}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="search-off" size={48} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchQuery ? 'Nenhum estabelecimento encontrado' : 'Nenhum estabelecimento disponível'}
            </Text>
            {searchQuery && (
              <Text style={styles.emptySubtext}>
                Tente buscar por outro termo
              </Text>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    height:150,
  },
  cardContent: {
    flexDirection: 'row',

  },
  imageContainer: {
    width: "40%",
    height: 150,
    
    marginRight: 16,
  },
  establishmentImage: {
    width: '100%',
    height: '100%',
  borderRadius:8
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f1f3f4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    paddingVertical:8,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  establishmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categoryContainer: {
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default EstablishmentList;
