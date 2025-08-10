# Braza - React Native App

A modern React Native application built with Expo, featuring multilingual content management with Sanity CMS and authentication with Supabase.

## 🚀 Tech Stack

- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **Expo Router** for navigation (file-based routing)
- **Zustand** for global state management
- **Supabase** for authentication (currently mock implementation)
- **Sanity CMS** for content management (currently mock data)
- **Expo Localization** for multilingual support

## 🧪 Mock Data & Testing

### Authentication Test Credentials

For testing the authentication flow, use these credentials:

- **Email**: `test@example.com`
- **Password**: `password123`

You can also create a new account with any email/password combination.

### Mock Content

The app includes mock data for:

- **Home Content**: Localized welcome messages and descriptions
- **Coupons**: Sample discount offers with codes (FOOD50, SHOP20)
- **Guides**: Local restaurant guides
- **Events**: Featured music festival

### Language Support

The app detects your device language and supports:
- **English** (en) - Default
- **Portuguese** (pt)
- **Spanish** (es)

Mock content is available in all supported languages.
- **Supabase** for authentication and backend
- **Sanity** for content management (multilingual)
- **Expo Localization** for device language detection

## 📱 Features

- **Tab Navigation**: Home, Coupons, Guides/Events, Profile
- **Authentication**: Email/password with Supabase
- **Multilingual Support**: Content served based on device language
- **Content Management**: Dynamic content from Sanity CMS
- **Modern UI**: Clean, iOS-inspired design

## 🏗️ Project Structure

```
├── app/                          # Expo Router pages
│   ├── (tabs)/                   # Tab navigation group
│   │   ├── _layout.tsx          # Tab layout configuration
│   │   ├── index.tsx            # Home screen
│   │   ├── coupons.tsx          # Coupons screen
│   │   ├── guides.tsx           # Guides & Events screen
│   │   └── profile.tsx          # Profile screen
│   ├── auth/                     # Authentication screens
│   │   ├── _layout.tsx          # Auth layout
│   │   └── index.tsx            # Login/Register screen
│   └── _layout.tsx              # Root layout
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useHomeContent.ts
│   │   └── useCoupons.ts
│   ├── services/                # API services
│   │   ├── supabase.ts          # Supabase configuration
│   │   ├── sanity.ts            # Sanity base service
│   │   ├── homeService.ts       # Home content service
│   │   └── couponService.ts     # Coupons service
│   ├── stores/                  # Zustand stores
│   │   └── authStore.ts         # Authentication store
│   ├── types/                   # TypeScript definitions
│   │   └── sanity.ts            # Sanity content types
│   └── utils/                   # Utility functions
│       └── localization.ts      # Language detection utilities
```

## 🔧 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update `src/services/supabase.ts`:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Configure Sanity

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Update `src/services/sanity.ts`:

```typescript
const SANITY_PROJECT_ID = 'YOUR_SANITY_PROJECT_ID';
const SANITY_DATASET = 'production'; // or 'development'
```

### 4. Run the App

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 🌍 Multilingual Content

The app automatically detects the device language and requests content in the appropriate language from Sanity. Supported languages:

- English (en) - Default fallback
- Portuguese (pt)
- Spanish (es)

Content structure in Sanity should include localized fields:

```javascript
// Example Sanity document
{
  title: {
    en: "Welcome",
    pt: "Bem-vindo", 
    es: "Bienvenido"
  }
}
```

## 🔐 Authentication Flow

1. Users access the Profile tab
2. If not authenticated, they see a login prompt
3. Tap "Sign In" to navigate to `/auth`
4. Users can toggle between login and registration
5. Upon successful authentication, they return to tabs
6. Authentication state persists using AsyncStorage

## 📋 Content Types

### Home Content
- Title, subtitle, description
- Featured image
- Sections with content and CTAs

### Coupons
- Title, description, terms
- Discount amount and type
- Validity dates
- Categories
- Images

### Guides & Events
- Title, description, content
- Publication dates
- Categories and tags
- Location data (for events)
- Images

## 🧩 Key Components

### Stores (Zustand)
- `authStore`: Manages user authentication state
- Persisted with AsyncStorage
- Handles login, register, logout, session check

### Services
- `sanityService`: Base Sanity API client
- `homeService`: Home content management
- `couponService`: Coupon data management
- Language-aware content fetching

### Hooks
- `useHomeContent`: Home page data management
- `useCoupons`: Paginated coupon data
- `useCouponCategories`: Coupon category data

## 🎨 Design System

- Colors: iOS-inspired palette
- Typography: System fonts with clear hierarchy
- Spacing: Consistent 8px grid system
- Components: Reusable, accessible UI elements

## 🚧 Next Steps

1. Set up Sanity schema for content types
2. Configure Supabase authentication policies
3. Add image optimization and caching
4. Implement push notifications
5. Add offline support
6. Create admin panel for content management

## 📝 License

This project is private and proprietary.
