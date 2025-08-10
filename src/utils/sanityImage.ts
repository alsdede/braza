import { urlFor } from '../lib/sanity';
import type { SanityImage } from '../types/sanity';

export interface ImageOptions {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  quality?: number;
  format?: 'jpg' | 'png' | 'webp';
}

/**
 * Generate optimized image URL from Sanity image
 */
export function getSanityImageUrl(
  image: SanityImage | undefined,
  options: ImageOptions = {}
): string | null {
  if (!image?.asset?._ref) return null;

  let builder = urlFor(image);

  if (options.width) {
    builder = builder.width(options.width);
  }

  if (options.height) {
    builder = builder.height(options.height);
  }

  if (options.fit) {
    builder = builder.fit(options.fit);
  }

  if (options.quality) {
    builder = builder.quality(options.quality);
  }

  if (options.format) {
    builder = builder.format(options.format);
  }

  // Auto format and quality for web optimization
  builder = builder.auto('format').quality(80);

  return builder.url();
}

/**
 * Get responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(image: SanityImage | undefined) {
  if (!image?.asset?._ref) return null;

  return {
    small: getSanityImageUrl(image, { width: 400, quality: 70 }),
    medium: getSanityImageUrl(image, { width: 800, quality: 75 }),
    large: getSanityImageUrl(image, { width: 1200, quality: 80 }),
    xlarge: getSanityImageUrl(image, { width: 1600, quality: 85 }),
  };
}

/**
 * Get image URL optimized for thumbnails
 */
export function getThumbnailUrl(image: SanityImage | undefined, size: number = 150): string | null {
  return getSanityImageUrl(image, {
    width: size,
    height: size,
    fit: 'crop',
    quality: 70,
  });
}

/**
 * Get image URL optimized for hero sections
 */
export function getHeroImageUrl(image: SanityImage | undefined): string | null {
  return getSanityImageUrl(image, {
    width: 1920,
    height: 1080,
    fit: 'crop',
    quality: 85,
  });
}

/**
 * Get blurred placeholder for image loading
 */
export function getBlurredPlaceholder(image: SanityImage | undefined): string | null {
  return getSanityImageUrl(image, {
    width: 20,
    quality: 20,
  });
}
