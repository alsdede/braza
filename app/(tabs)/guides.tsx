import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { sanityService } from '../../src/services/sanity';
import type { Guide, Event } from '../../src/types/sanity';

export default function GuidesScreen() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'guides' | 'events'>('guides');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const [guideList, eventList] = await Promise.all([
        sanityService.query<Guide[]>('*[_type == "guide" && isPublished == true]'),
        sanityService.query<Event[]>('*[_type == "event" && isPublished == true]')
      ]);
      setGuides(guideList);
      setEvents(eventList);
    } catch (error) {
      console.error('Error loading guides/events:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderGuide = (guide: Guide) => (
    <TouchableOpacity key={guide._id} style={styles.card}>
      <Text style={styles.cardTitle}>
        {sanityService.getLocalizedContent(guide.title)}
      </Text>
      <Text style={styles.cardDescription}>
        {sanityService.getLocalizedContent(guide.description)}
      </Text>
      <Text style={styles.cardDate}>
        Published: {new Date(guide.publishedAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  const renderEvent = (event: Event) => (
    <TouchableOpacity key={event._id} style={[styles.card, event.isFeatured && styles.featuredCard]}>
      {event.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}
      <Text style={styles.cardTitle}>
        {sanityService.getLocalizedContent(event.title)}
      </Text>
      <Text style={styles.cardDescription}>
        {sanityService.getLocalizedContent(event.description)}
      </Text>
      {event.location && (
        <Text style={styles.eventLocation}>
          📍 {sanityService.getLocalizedContent(event.location.name)} - {sanityService.getLocalizedContent(event.location.city)}
        </Text>
      )}
      <Text style={styles.cardDate}>
        📅 {new Date(event.startDate).toLocaleDateString()} at {new Date(event.startDate).toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Guides & Events</Text>
        <Text style={styles.subtitle}>
          Discover guides and events in your region
        </Text>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'guides' && styles.activeTab]}
            onPress={() => setActiveTab('guides')}
          >
            <Text style={[styles.tabText, activeTab === 'guides' && styles.activeTabText]}>
              Guides ({guides.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'events' && styles.activeTab]}
            onPress={() => setActiveTab('events')}
          >
            <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
              Events ({events.length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentList}>
          {activeTab === 'guides' ? (
            guides.length > 0 ? (
              guides.map(renderGuide)
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>No guides available</Text>
              </View>
            )
          ) : (
            events.length > 0 ? (
              events.map(renderEvent)
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>No events available</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#8E8E93',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6E6E73',
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  contentList: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredCard: {
    borderColor: '#FF9500',
    borderWidth: 2,
  },
  featuredBadge: {
    position: 'absolute',
    top: -1,
    right: 12,
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6E6E73',
    marginBottom: 12,
    lineHeight: 20,
  },
  eventLocation: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  placeholder: {
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 12,
  },
  placeholderText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
