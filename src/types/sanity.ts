// Base types for Sanity content

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Page types
export interface Page extends SanityDocument {
  _type: 'page';
  title: string;
  language: 'pt' | 'en' | 'es';
  slug: SanitySlug;
  pageTitle?: string;
  description?: string;
  isActive: boolean;
  sections?: Section[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
  publishedAt: string;
}

// Section types
export type Section = 
  | HeroSection 
  | ContentSection 
  | GallerySection 
  | CtaSection 
  | FeaturedEstablishmentsSection 
  | LatestNewsSection 
  | ContactSection;

export interface HeroSection {
  _type: 'heroSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: SanityImage;
  ctaButton?: {
    text: string;
    link: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  isActive: boolean;
}

export interface ContentSection {
  _type: 'contentSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  content?: any[]; // Rich text content
  isActive: boolean;
}

export interface GallerySection {
  _type: 'gallerySection';
  _key?: string;
  title?: string;
  subtitle?: string;
  images: {
    _key: string;
    _type: 'image';
    asset: SanityImage['asset'];
    alt?: string;
    caption?: string;
    linkTo?: {
      _ref: string;
      _type: 'reference';
    };
  }[];
  layout: 'grid' | 'carousel' | 'masonry';
  isActive: boolean;
}

export interface CtaSection {
  _type: 'ctaSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  subtitle?: string;
  backgroundImage?: SanityImage;
  buttons?: {
    _key: string;
    text: string;
    url: string;
    style: 'primary' | 'secondary' | 'outline';
  }[];
  isActive: boolean;
}

export interface FeaturedEstablishmentsSection {
  _type: 'featuredEstablishmentsSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  maxItems: number;
  filterBy: 'rating' | 'recent' | 'manual';
  manualSelection?: {
    _ref: string;
    _type: 'reference';
  }[];
  isActive: boolean;
}

export interface LatestNewsSection {
  _type: 'latestNewsSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  maxItems: number;
  categories?: ('general' | 'events' | 'culture' | 'gastronomy')[];
  isActive: boolean;
}

export interface ContactSection {
  _type: 'contactSection';
  _key?: string;
  sectionTitle: string;
  title?: string;
  subtitle?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  showForm: boolean;
  showMap: boolean;
  isActive: boolean;
}

// News
export interface News extends SanityDocument {
  _type: 'news';
  title: string;
  excerpt?: string;
  slug: SanitySlug;
  featuredImage?: SanityImage;
  category: 'general' | 'events' | 'culture' | 'gastronomy';
  publishedAt: string;
  status: 'draft' | 'published';
}

// Establishment
export interface Establishment extends SanityDocument {
  _type: 'establishment';
  name: string;
  slug: SanitySlug;
  description?: string;
  category: 'restaurant' | 'bar' | 'cafe' | 'hotel' | 'shop' | 'attraction' | 'services' | 'entertainment' | 'other';
  subCategory?: string; // Nova subcategoria com mais de 70 opções
  featuredImage:SanityImage;
  images?: SanityImage[];
  location?: {
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  rating?: number;
  priceRange?: 'budget' | 'moderate' | 'expensive' | 'luxury';
  features?: string[];
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  isActive: boolean;
}

// Advertisement
export interface Advertisement extends SanityDocument {
  _type: 'ads';
  title?: string;
  internalName: string;
  description?: string;
  campaignType: 'banner' | 'sponsored' | 'popup' | 'native';
  placement: string[];
  media?: {
    images?: SanityImage[];
    videos?: any[];
  };
  isActive: boolean;
}

// Home Content
export interface HomeContent extends SanityDocument {
  _type: 'homeContent';
  title: string;
  welcomeTitle?: string;
  welcomeSubtitle?: string;
  featuredContent?: any[];
  featuredImage?: SanityImage;
  isActive: boolean;
}

// Legacy types for backward compatibility (deprecated)
export interface LocalizedString {
  en?: string;
  pt?: string;
  es?: string;
}

export interface Coupon extends SanityDocument {
  _type: 'coupon';
  title: LocalizedString;
  description: LocalizedString;
  discount: number;
  discountType: 'percentage' | 'fixed';
  code: string;
  validFrom: string;
  validTo: string;
  isActive: boolean;
}

export interface Guide extends SanityDocument {
  _type: 'guide';
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString;
  slug: SanitySlug;
  publishedAt: string;
  isPublished: boolean;
}

export interface Event extends SanityDocument {
  _type: 'event';
  title: LocalizedString;
  description: LocalizedString;
  slug: SanitySlug;
  startDate: string;
  endDate: string;
  location: {
    name: LocalizedString;
    address: LocalizedString;
    city: LocalizedString;
  };
  isPublished: boolean;
  isFeatured: boolean;
}