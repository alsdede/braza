import { sanityService } from './sanity';
import type { HomeContent, HomeSection } from '../types/sanity';

/**
 * Service for managing home page content
 */
export class HomeService {
  /**
   * Get the main home page content
   * @returns Promise with home content data
   */
  async getHomeContent(): Promise<HomeContent | null> {
    const query = `
      *[_type == "homeContent"][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        subtitle,
        description,
        featuredImage {
          _type,
          asset,
          alt,
          hotspot,
          crop
        },
        sections[] {
          _key,
          _type,
          title,
          content,
          image {
            _type,
            asset,
            alt,
            hotspot,
            crop
          },
          cta {
            text,
            url
          }
        }
      }
    `;

    try {
      const result = await sanityService.query<HomeContent>(query);
      return result;
    } catch (error) {
      console.error('Error fetching home content:', error);
      return null;
    }
  }

  /**
   * Get localized text for home content
   * @param content - The home content object
   * @param field - The field to get localized text for
   * @returns The localized text string
   */
  getLocalizedText(content: HomeContent, field: keyof Pick<HomeContent, 'title' | 'subtitle' | 'description'>): string {
    const language = sanityService.getCurrentLanguage();
    const localizedField = content[field];
    
    if (!localizedField || typeof localizedField === 'string') {
      return localizedField as string || '';
    }

    return localizedField[language] || localizedField.en || localizedField.pt || '';
  }

  /**
   * Get localized text for home sections
   * @param section - The home section object
   * @param field - The field to get localized text for
   * @returns The localized text string
   */
  getSectionLocalizedText(section: HomeSection, field: keyof Pick<HomeSection, 'title' | 'content'>): string {
    const language = sanityService.getCurrentLanguage();
    const localizedField = section[field];
    
    if (!localizedField || typeof localizedField === 'string') {
      return localizedField as string || '';
    }

    return localizedField[language] || localizedField.en || localizedField.pt || '';
  }
}

export const homeService = new HomeService();
