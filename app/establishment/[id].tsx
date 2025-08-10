import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import { Establishment } from '../../src/types/sanity';
import { getEstablishmentById } from '../../src/services/sanity';
import { urlFor } from '../../src/lib/sanity';

const { width: screenWidth } = Dimensions.get('window');

export default function EstablishmentDetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [establishment, setEstablishment] = useState<Establishment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    loadEstablishmentDetails();
  }, [params.id]);

  const loadEstablishmentDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      setCurrentImageIndex(0); // Reset image counter
      
      if (!params.id || typeof params.id !== 'string') {
        throw new Error('ID do estabelecimento não fornecido');
      }

      const data = await getEstablishmentById(params.id);
      setEstablishment(data);
    } catch (err) {
      console.error('Erro ao carregar detalhes:', err);
      setError('Erro ao carregar detalhes do estabelecimento');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsite = (website: string) => {
    const url = website.startsWith('http') ? website : `https://${website}`;
    Linking.openURL(url);
  };

  const handleSocialMedia = (platform: string, url: string) => {
    if (url) {
      // Se a URL já começa com http, usa diretamente, senão constrói a URL
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;
      Linking.openURL(finalUrl);
    }
  };

  const handleDirections = () => {
    if (establishment?.location?.coordinates) {
      const { lat, lng } = establishment.location.coordinates;
      const url = `https://maps.google.com/?q=${lat},${lng}`;
      Linking.openURL(url);
    } else if (establishment?.location?.address) {
      const url = `https://maps.google.com/?q=${encodeURIComponent(establishment.location.address)}`;
      Linking.openURL(url);
    }
  };

  const renderCarouselItem = ({ item: image, index }: { item: any; index: number }) => {
    const imageUrl = urlFor(image).width(screenWidth).height(250).url();
    
    return (
      <View style={styles.carouselItem}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      </View>
    );
  };

  const formatOpeningHours = (hours: any[]) => {
    if (!hours || !Array.isArray(hours)) return null;
    
    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const dayMapping = {
      'monday': 0,
      'tuesday': 1, 
      'wednesday': 2,
      'thursday': 3,
      'friday': 4,
      'saturday': 5,
      'sunday': 6
    };
    
    // Organizar horários por dia da semana
    const organizedHours = new Array(7).fill(null);
    hours.forEach(hour => {
      const dayIndex = dayMapping[hour.day as keyof typeof dayMapping];
      if (dayIndex !== undefined) {
        organizedHours[dayIndex] = hour;
      }
    });
    
    return organizedHours.map((dayHour, index) => {
      if (!dayHour) return null;
      
      return (
        <View key={index} style={styles.hourRow}>
          <Text style={styles.dayText}>{days[index]}</Text>
          <Text style={styles.timeText}>
            {dayHour.isClosed ? 'Fechado' : `${dayHour.openTime} - ${dayHour.closeTime}`}
          </Text>
        </View>
      );
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carregando...</Text>
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !establishment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erro</Text>
        </View>
        <View style={styles.centerContainer}>
          <MaterialIcons name="error-outline" size={48} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadEstablishmentDetails}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  console.log("establishment.gallery",establishment.gallery)
  return (
    <SafeAreaView style={styles.container}>
      {/* Header com botão voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {establishment.name}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Carousel de Imagens */}
        {establishment.gallery && establishment.gallery.length > 0 && (
          <View style={styles.carouselContainer}>
            <Carousel
              width={screenWidth}
              height={250}
              data={establishment.gallery}
              renderItem={renderCarouselItem}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              loop
              autoPlay={establishment.gallery.length > 1}
              autoPlayInterval={4000}
              onSnapToItem={(index) => setCurrentImageIndex(index)}
            />
            {establishment.gallery.length > 1 && (
              <View style={styles.imageCounter}>
                <Text style={styles.imageCounterText}>
                  {currentImageIndex + 1} / {establishment.gallery.length}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Informações Principais */}
        <View style={styles.mainInfo}>
          <View style={styles.titleSection}>
            <Text style={styles.establishmentName}>{establishment.name}</Text>
            {establishment.averageRating && (
              <View style={styles.ratingContainer}>
                <AntDesign name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{establishment.averageRating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          {/* Categoria e Subcategoria */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryText}>
              {establishment.category}
              {establishment.subCategory && ` • ${establishment.subCategory}`}
            </Text>
            {establishment.priceRange && (
              <Text style={styles.priceRangeText}>
                {establishment.priceRange === 'budget' && '€'}
                {establishment.priceRange === 'moderate' && '€€'}
                {establishment.priceRange === 'expensive' && '€€€'}
                {establishment.priceRange === 'luxury' && '€€€€'}
              </Text>
            )}
          </View>

          {/* Descrição */}
          {establishment.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sobre</Text>
              <Text style={styles.descriptionText}>{establishment.description}</Text>
            </View>
          )}

          {/* Localização */}
          {establishment.location && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Localização</Text>
                {(establishment.location.coordinates || establishment.location.address) && (
                  <TouchableOpacity onPress={handleDirections} style={styles.directionsButton}>
                    <MaterialIcons name="directions" size={20} color="#007AFF" />
                    <Text style={styles.directionsText}>Direções</Text>
                  </TouchableOpacity>
                )}
              </View>
              {establishment.location.address && (
                <View style={styles.locationRow}>
                  <MaterialIcons name="location-on" size={18} color="#666" />
                  <Text style={styles.locationText}>{establishment.location.address}</Text>
                </View>
              )}
              {establishment.location.city && (
                <Text style={styles.cityText}>
                  {establishment.location.city}
                  {establishment.location.country && `, ${establishment.location.country}`}
                </Text>
              )}
            </View>
          )}

          {/* Contato */}
          {establishment.contact && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contato</Text>
              {establishment.contact.whatsapp && (
                <TouchableOpacity 
                  onPress={() => handleCall(establishment.contact!.whatsapp!)}
                  style={styles.contactRow}
                >
                  <Feather name="message-circle" size={18} color="#007AFF" />
                  <Text style={styles.contactText}>{establishment.contact.whatsapp}</Text>
                </TouchableOpacity>
              )}
              {establishment.contact.phone && (
                <TouchableOpacity 
                  onPress={() => handleCall(establishment.contact!.phone!)}
                  style={styles.contactRow}
                >
                  <Feather name="phone" size={18} color="#007AFF" />
                  <Text style={styles.contactText}>{establishment.contact.phone}</Text>
                </TouchableOpacity>
              )}
              {establishment.contact.email && (
                <TouchableOpacity 
                  onPress={() => handleEmail(establishment.contact!.email!)}
                  style={styles.contactRow}
                >
                  <Feather name="mail" size={18} color="#007AFF" />
                  <Text style={styles.contactText}>{establishment.contact.email}</Text>
                </TouchableOpacity>
              )}
              {establishment.contact.website && (
                <TouchableOpacity 
                  onPress={() => handleWebsite(establishment.contact!.website!)}
                  style={styles.contactRow}
                >
                  <Feather name="globe" size={18} color="#007AFF" />
                  <Text style={styles.contactText}>{establishment.contact.website}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Redes Sociais */}
          {establishment.socialMedia && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Redes Sociais</Text>
              <View style={styles.socialMediaContainer}>
                {establishment.socialMedia.facebook && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('facebook', establishment.socialMedia!.facebook!)}
                    style={styles.socialButton}
                  >
                    <AntDesign name="facebook-square" size={24} color="#1877F2" />
                   
                  </TouchableOpacity>
                )}
                {establishment.socialMedia.instagram && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('instagram', establishment.socialMedia!.instagram!)}
                    style={styles.socialButton}
                  >
                    <AntDesign name="instagram" size={24} color="#E4405F" />
                    
                  </TouchableOpacity>
                )}
                {establishment.socialMedia.twitter && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('twitter', establishment.socialMedia!.twitter!)}
                    style={styles.socialButton}
                  >
                    <AntDesign name="twitter" size={24} color="#1DA1F2" />
             
                  </TouchableOpacity>
                )}
                {establishment.socialMedia.linkedin && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('linkedin', establishment.socialMedia!.linkedin!)}
                    style={styles.socialButton}
                  >
                    <AntDesign name="linkedin-square" size={24} color="#0077B5" />
                   
                  </TouchableOpacity>
                )}
                {establishment.socialMedia.youtube && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('youtube', establishment.socialMedia!.youtube!)}
                    style={styles.socialButton}
                  >
                    <AntDesign name="youtube" size={24} color="#FF0000" />
                
                  </TouchableOpacity>
                )}
                {establishment.socialMedia.tiktok && (
                  <TouchableOpacity 
                    onPress={() => handleSocialMedia('tiktok', establishment.socialMedia!.tiktok!)}
                    style={styles.socialButton}
                  >
                    <MaterialIcons name="music-note" size={24} color="#000000" />
              
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {/* Características */}
          {establishment.features && establishment.features.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Características</Text>
              <View style={styles.featuresContainer}>
                {establishment.features.map((feature, index) => (
                  <View key={index} style={styles.featureTag}>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Horário de Funcionamento */}
          {establishment.operatingHours && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Horário de Funcionamento</Text>
              <View style={styles.hoursContainer}>
                {formatOpeningHours(establishment.operatingHours)}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
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
  carouselContainer: {
    position: 'relative',
  },
  carouselItem: {
    width: screenWidth,
    height: 250,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  mainInfo: {
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  establishmentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  categorySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  priceRangeText: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  cityText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  directionsText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#007AFF',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  hoursContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
});
