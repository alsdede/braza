import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getPagesByLanguage, getNews, getEstablishments } from '../services/sanity';
import { SectionRenderer } from './sections';
import { useSections } from '../hooks/useSections';
import type { Page, News, Establishment } from '../types/sanity';

export default function SanityTestScreen() {
  const [pages, setPages] = useState<Page[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSanityConnection() {
      try {
        setLoading(true);
        
        // Test basic queries
        const [pagesData, newsData, establishmentsData] = await Promise.all([
          getPagesByLanguage('pt'),
          getNews('pt', undefined, 5),
          getEstablishments('pt', 5)
        ]);

        setPages(pagesData);
        setNews(newsData);
        setEstablishments(establishmentsData);
        
        console.log('Sanity connection successful!');
        console.log('Pages:', pagesData);
        console.log('News:', newsData);
        console.log('Establishments:', establishmentsData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Sanity connection error:', err);
      } finally {
        setLoading(false);
      }
    }

    testSanityConnection();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Testing Sanity Connection...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Connection Error</Text>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      
  

        {pages.map((page) => (
          <PageRenderer key={page._id} page={page} />
        ))}
 

  

 
    </ScrollView>
  );
}

// Componente separado para renderizar cada página com suas seções
function PageRenderer({ page }: { page: Page }) {
  const optimizedSections = useSections(page.sections);
  
  return (
    <View style={styles.sectionWrapper}>
 
      
      {/* Renderizar seções da página dinamicamente */}
      {optimizedSections.length > 0 && (
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionSubtitle}>Seções ({optimizedSections.length}):</Text>
          {optimizedSections.map((section, index) => (
            <SectionRenderer
              key={section._key}
              section={section}
              index={index}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  sectionWrapper: {

  },
  sectionsContainer: {
   
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
