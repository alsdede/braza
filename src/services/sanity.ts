import { getDeviceLanguage, type SupportedLanguage } from '../utils/localization';
import type { HomeContent, Page, News, Establishment, Advertisement } from '../types/sanity';
import { sanityClient } from '../lib/sanity';

// Current language state
let currentLanguage: SupportedLanguage = getDeviceLanguage();

/**
 * Execute a GROQ query
 */
export async function query<T = any>(groqQuery: string, params: Record<string, any> = {}): Promise<T> {
  try {
    return await sanityClient.fetch(groqQuery, params);
  } catch (error) {
    console.error('Sanity query error:', error);
    throw error;
  }
}

/**
 * Get current language
 */
export function getCurrentLanguage(): SupportedLanguage {
  return currentLanguage;
}

/**
 * Set language
 */
export function setLanguage(language: SupportedLanguage): void {
  currentLanguage = language;
}

/**
 * Get pages by language
 */
export async function getPagesByLanguage(language?: SupportedLanguage): Promise<Page[]> {
  const lang = language || currentLanguage;
  const groqQuery = `*[_type == "page" && language == $language] | order(publishedAt desc)`;
  return query<Page[]>(groqQuery, { language: lang });
}

/**
 * Get page by slug and language
 */
export async function getPageBySlug(slug: string, language?: SupportedLanguage): Promise<Page | null> {
  const lang = language || currentLanguage;
  const groqQuery = `*[_type == "page" && slug.current == $slug && language == $language && isActive == true][0]{
    ...,
    sections[]{
      ...,
      _type == "gallerySection" => {
        ...,
        images[]{
          ...,
          linkTo->{
            _id,
            title,
            slug,
            language
          }
        }
      }
    }
  }`;
  return query<Page | null>(groqQuery, { slug, language: lang });
}

/**
 * Get home content
 */
export async function getHomeContent(): Promise<HomeContent | null> {
  const groqQuery = `*[_type == "homeContent" && isActive == true][0]`;
  return query<HomeContent | null>(groqQuery);
}

/**
 * Get news articles by language and category
 */
export async function getNews(
  language?: SupportedLanguage,
  category?: string,
  limit: number = 10
): Promise<News[]> {
  const lang = language || currentLanguage;
  let groqQuery = `*[_type == "news" && status == "published"`;
  
  if (category) {
    groqQuery += ` && category == "${category}"`;
  }
  
  groqQuery += `] | order(publishedAt desc)[0...${limit}]`;
  
  return query<News[]>(groqQuery);
}

/**
 * Get establishments
 */
export async function getEstablishments(
  language?: SupportedLanguage,
  limit: number = 20
): Promise<Establishment[]> {
  const lang = language || currentLanguage;
  const groqQuery = `*[_type == "establishment" && isActive == true] | order(rating desc)[0...${limit}]`;
  return query<Establishment[]>(groqQuery);
}

/**
 * Get establishment by ID
 */
export async function getEstablishmentById(
  id: string
): Promise<Establishment | null> {
  const groqQuery = `*[_type == "establishment" && _id == "${id}"][0]`;
  return query<Establishment>(groqQuery);
}

/**
 * Get featured establishments
 */
export async function getFeaturedEstablishments(
  filterBy: 'rating' | 'recent' | 'manual' = 'rating',
  limit: number = 6
): Promise<Establishment[]> {
  let groqQuery = `*[_type == "establishment" && isActive == true]`;
  
  switch (filterBy) {
    case 'rating':
      groqQuery += ` | order(rating desc)`;
      break;
    case 'recent':
      groqQuery += ` | order(_createdAt desc)`;
      break;
    default:
      groqQuery += ` | order(rating desc)`;
  }
  
  groqQuery += `[0...${limit}]`;
  
  return query<Establishment[]>(groqQuery);
}

/**
 * Get advertisements by placement
 */
export async function getAdvertisements(placement: string): Promise<Advertisement[]> {
  const groqQuery = `*[_type == "ads" && isActive == true && $placement in placement[]]`;
  return query<Advertisement[]>(groqQuery, { placement });
}

/**
 * Search content across all types
 */
export async function searchContent(searchTerm: string, language?: SupportedLanguage): Promise<any[]> {
  const lang = language || currentLanguage;
  const groqQuery = `*[
    (_type == "page" && language == $language && (
      title match $searchTerm + "*" ||
      pageTitle match $searchTerm + "*" ||
      description match $searchTerm + "*"
    )) ||
    (_type == "news" && (
      title match $searchTerm + "*" ||
      excerpt match $searchTerm + "*"
    )) ||
    (_type == "establishment" && (
      name match $searchTerm + "*" ||
      description match $searchTerm + "*"
    ))
  ] | order(_score desc)[0...20]`;
  
  return query(groqQuery, { searchTerm, language: lang });
}

// Default export object for backward compatibility
export const sanityService = {
  query,
  getCurrentLanguage,
  setLanguage,
  getPagesByLanguage,
  getPageBySlug,
  getHomeContent,
  getNews,
  getEstablishments,
  getEstablishmentById,
  getFeaturedEstablishments,
  getAdvertisements,
  searchContent,
};
