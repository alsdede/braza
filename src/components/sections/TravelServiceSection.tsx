import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Linking,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text } from '../ui';
import { colors } from '../../constants/colors';
import { getSanityImageUrl } from '../../utils/sanityImage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Types based on Sanity schema
interface TravelService {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  backgroundImage: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    alt?: string;
  };
  linkType: 'external' | 'internal' | 'browser';
  externalUrl?: string;
  internalReference?: {
    _type: string;
    slug: {
      current: string;
    };
  };
  description?: string;
  isActive: boolean;
  order: number;
}

interface TravelServiceSectionData {
  _id: string;
  title: string;
  subtitle?: string;
  services: TravelService[];
  isVisible: boolean;
  displayStyle: 'grid-3' | 'grid-2' | 'horizontal' | 'vertical';
}

interface TravelServiceSectionProps {
  data: TravelServiceSectionData;
}

const TravelServiceSection: React.FC<TravelServiceSectionProps> = ({ data }) => {
  const router = useRouter();

  // Don't render if section is not visible
  if (!data.isVisible) {
    return null;
  }

  // Filter active services and sort by order
  const activeServices = data.services
    .filter(service => service.isActive)
    .sort((a, b) => a.order - b.order);

  if (activeServices.length === 0) {
    return null;
  }

  const handleServicePress = async (service: TravelService) => {
    try {
      switch (service.linkType) {
        case 'external':
          // Open in WebView (you can implement WebView navigation here)
          if (service.externalUrl) {
            // For now, open in browser until WebView is implemented
            await Linking.openURL(service.externalUrl);
          }
          break;
        
        case 'browser':
          // Open in external browser
          if (service.externalUrl) {
            await Linking.openURL(service.externalUrl);
          }
          break;
        
        case 'internal':
          // Navigate to internal page
          if (service.internalReference) {
            const { _type, slug } = service.internalReference;
            switch (_type) {
              case 'establishment':
                router.push({
                  pathname: '/establishment/[id]',
                  params: { id: slug.current }
                });
                break;
              case 'page':
                // TODO: Implement page navigation when route exists
                console.log(`Navigate to page: ${slug.current}`);
                break;
              case 'news':
                // TODO: Implement news navigation when route exists
                console.log(`Navigate to news: ${slug.current}`);
                break;
              default:
                console.warn(`Unknown internal reference type: ${_type}`);
            }
          }
          break;
        
        default:
          console.warn(`Unknown link type: ${service.linkType}`);
      }
    } catch (error) {
      console.error('Error handling service press:', error);
    }
  };

  const getItemWidth = () => {
    const padding = 20; // Container padding
    const gap = 12; // Gap between items
    
    switch (data.displayStyle) {
      case 'grid-2':
        return (width - padding * 2 - gap) / 2;
      case 'grid-3':
      default:
        return (width - padding * 2 - gap * 2) / 3;
    }
  };

  const renderHorizontalScroll = () => {
    // TODO: Implement horizontal scroll version if needed
    return null;
  };

  const renderVerticalList = () => {
    // TODO: Implement vertical list version if needed
    return null;
  };

  const renderGridLayout = () => {
    return (
      <View style={styles.servicesGrid}>
        {activeServices.map((service, index) => {
          const itemWidth = getItemWidth();
          const isLastInRow = (index + 1) % (data.displayStyle === 'grid-2' ? 2 : 3) === 0;
          
          return (
            <TouchableOpacity
              key={`travel-service-${service._id}-${index}`}
              style={[
                styles.serviceItem,
                {
                  width: itemWidth,
                  marginRight: isLastInRow ? 0 : 12,
                //   backgroundColor:"#abe0ec"
                },
              ]}
              onPress={() => handleServicePress(service)}
              activeOpacity={0.8}
            >
          
       
              
                 
       
              <MaterialCommunityIcons size={24} name='airplane'/>
               <View style={styles.serviceContent}>
                    <Text
                      color="secondary"
                      align="center"
                      weight="semibold"
                      numberOfLines={2}
                      ellipsizeMode='tail'
                      style={styles.serviceName}
                    >
                      {service.name}
                    </Text>
                  </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderContent = () => {
    switch (data.displayStyle) {
      case 'horizontal':
        return renderHorizontalScroll();
      case 'vertical':
        return renderVerticalList();
      case 'grid-2':
      case 'grid-3':
      default:
        return renderGridLayout();
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        {/* <Text variant="h3" color="primary" style={styles.title}>
          {data.title}
        </Text> */}
        {data.subtitle && (
          <Text variant="body" color="secondary" style={styles.subtitle}>
            {data.subtitle}
          </Text>
        )}
      </View>

      {/* Services Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,

  },
  header: {
    marginBottom: 0,
    marginLeft:20
  },
  title: {
    fontSize:14
  },
  subtitle: {
    lineHeight: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginLeft:20,
  },
  serviceItem: {
    height: 60,
    marginBottom: 12,
    borderRadius: 16,
    borderColor:colors.gray[300],
    borderWidth:1,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    alignItems:"center",
    justifyContent:"center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  glassBackground: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // Backdrop blur effect (iOS)
    backdropFilter: 'blur(10px)',
  },
  glassInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  backgroundImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  imageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
  },
  serviceContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap:4,
   
  },
  serviceName: {
    lineHeight:12,
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  serviceDescription: {
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 2,
    opacity: 0.9,
  
  },
});

export default TravelServiceSection;
