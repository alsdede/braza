import { sanityService } from './sanity';
import type { Coupon, CouponCategory, PaginatedResponse } from '../types/sanity';

/**
 * Service for managing coupons
 */
export class CouponService {
  /**
   * Get active coupons with pagination
   * @param offset - Number of items to skip
   * @param limit - Number of items to fetch
   * @returns Promise with paginated coupon data
   */
  async getCoupons(offset = 0, limit = 20): Promise<PaginatedResponse<Coupon>> {
    const query = `
      {
        "items": *[_type == "coupon" && isActive == true] | order(validTo desc) [$offset...$end] {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          discount,
          discountType,
          code,
          validFrom,
          validTo,
          image {
            _type,
            asset,
            alt,
            hotspot,
            crop
          },
          isActive,
          category-> {
            _id,
            name,
            slug,
            icon {
              _type,
              asset,
              alt
            }
          },
          terms
        },
        "total": count(*[_type == "coupon" && isActive == true])
      }
    `;

    try {
      const result = await sanityService.query<{ items: Coupon[]; total: number }>(query, {
        offset,
        end: offset + limit,
      });

      return {
        ...result,
        hasMore: result.total > offset + limit,
      };
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return { items: [], total: 0, hasMore: false };
    }
  }

  /**
   * Get coupon by ID
   * @param id - The coupon ID
   * @returns Promise with coupon data
   */
  async getCouponById(id: string): Promise<Coupon | null> {
    const query = `
      *[_type == "coupon" && _id == $id][0] {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        title,
        description,
        discount,
        discountType,
        code,
        validFrom,
        validTo,
        image {
          _type,
          asset,
          alt,
          hotspot,
          crop
        },
        isActive,
        category-> {
          _id,
          name,
          slug,
          icon {
            _type,
            asset,
            alt
          }
        },
        terms
      }
    `;

    try {
      const result = await sanityService.query<Coupon>(query, { id });
      return result;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      return null;
    }
  }

  /**
   * Get coupons by category
   * @param categoryId - The category ID
   * @param offset - Number of items to skip
   * @param limit - Number of items to fetch
   * @returns Promise with paginated coupon data
   */
  async getCouponsByCategory(
    categoryId: string,
    offset = 0,
    limit = 20
  ): Promise<PaginatedResponse<Coupon>> {
    const query = `
      {
        "items": *[_type == "coupon" && isActive == true && category._ref == $categoryId] | order(validTo desc) [$offset...$end] {
          _id,
          _type,
          _createdAt,
          _updatedAt,
          title,
          description,
          discount,
          discountType,
          code,
          validFrom,
          validTo,
          image {
            _type,
            asset,
            alt,
            hotspot,
            crop
          },
          isActive,
          category-> {
            _id,
            name,
            slug,
            icon {
              _type,
              asset,
              alt
            }
          },
          terms
        },
        "total": count(*[_type == "coupon" && isActive == true && category._ref == $categoryId])
      }
    `;

    try {
      const result = await sanityService.query<{ items: Coupon[]; total: number }>(query, {
        categoryId,
        offset,
        end: offset + limit,
      });

      return {
        ...result,
        hasMore: result.total > offset + limit,
      };
    } catch (error) {
      console.error('Error fetching coupons by category:', error);
      return { items: [], total: 0, hasMore: false };
    }
  }

  /**
   * Get all coupon categories
   * @returns Promise with category data
   */
  async getCategories(): Promise<CouponCategory[]> {
    const query = `
      *[_type == "couponCategory"] | order(name.en asc) {
        _id,
        _type,
        _createdAt,
        _updatedAt,
        name,
        slug,
        description,
        icon {
          _type,
          asset,
          alt
        }
      }
    `;

    try {
      const result = await sanityService.query<CouponCategory[]>(query);
      return result || [];
    } catch (error) {
      console.error('Error fetching coupon categories:', error);
      return [];
    }
  }

  /**
   * Get localized text for coupons
   * @param coupon - The coupon object
   * @param field - The field to get localized text for
   * @returns The localized text string
   */
  getLocalizedText(coupon: Coupon, field: keyof Pick<Coupon, 'title' | 'description' | 'terms'>): string {
    const language = sanityService.getCurrentLanguage();
    const localizedField = coupon[field];
    
    if (!localizedField) {
      return '';
    }

    if (typeof localizedField === 'string') {
      return localizedField;
    }

    return localizedField[language] || localizedField.en || localizedField.pt || '';
  }

  /**
   * Check if a coupon is still valid
   * @param coupon - The coupon object
   * @returns True if the coupon is valid
   */
  isCouponValid(coupon: Coupon): boolean {
    const now = new Date();
    const validFrom = new Date(coupon.validFrom);
    const validTo = new Date(coupon.validTo);
    
    return coupon.isActive && now >= validFrom && now <= validTo;
  }
}

export const couponService = new CouponService();
