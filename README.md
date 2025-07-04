# CS Collection - TanStack Router Implementation

A modern React application showcasing Counter-Strike weapon skins and stickers, built with TanStack Router for file-based routing and enhanced user experience.

## ✨ Features

- **🚀 File-based Routing**: Clean URL structure with TanStack Router
- **🎨 Beautiful UI**: Modern design with Tailwind CSS and dark mode support
- **⭐ User Preferences**: Favorites system with local storage persistence (Context7 integration)
- **🔍 Smart Sorting**: Sort items by name, rarity, or weapon type
- **📱 Responsive Design**: Works perfectly on all device sizes
- **⚡ Fast Loading**: TanStack Query for optimized data fetching and caching
- **🛠️ Settings Page**: Configurable preferences and favorites management

## 🏗️ Architecture

### File-based Routing Structure

```
src/routes/
├── __root.tsx          # Root layout with navigation
├── index.tsx           # Home page
├── skins.tsx           # Weapon skins collection
├── stickers.tsx        # Stickers collection
├── settings.tsx        # User preferences
└── about.tsx           # About page
```

### Tech Stack

- **React 19** - UI framework
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management and caching
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

### Key Components

- **UserPreferencesContext** - Global state for user settings and favorites
- **SkinItem & StickerItem** - Reusable item display components with multiple size variants
- **LoadingSpinner** - Consistent loading states

## 🚀 Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5174`

## 📄 Available Routes

- `/` - Home page with overview and quick navigation
- `/skins` - Browse weapon skins with sorting and favorites
- `/stickers` - Explore stickers collection with rarity information
- `/settings` - Configure preferences, manage favorites, and theme settings
- `/about` - Learn about the application and its features

## 🎛️ User Preferences (Context7 Integration)

The application includes a comprehensive preferences system that remembers:

- **Theme Selection**: Light, dark, or auto (system preference)
- **Items Per Page**: Configurable display limits (10, 20, 50, 100)
- **Sorting Preferences**: Default sort by name, rarity, or price
- **Favorites**: Star system for marking favorite items
- **Sort Order**: Ascending or descending preferences

All preferences are automatically saved to localStorage and persist across sessions.

## 🔧 Key Features Implementation

### Routing

- **File-based routing** with automatic route tree generation
- **Type-safe navigation** with TanStack Router
- **Active link styling** with automatic highlighting
- **Nested layouts** with shared navigation

### Data Management

- **Suspense Query** for automatic loading states
- **Error boundaries** with retry functionality
- **Optimistic updates** for favorites system
- **Background refetching** for fresh data

### User Experience

- **Click-to-favorite** system on item cards
- **Visual feedback** with star indicators and ring highlights
- **Smooth animations** and hover effects
- **Responsive grid layouts** that adapt to screen size

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

- **Color Palette**: Blue primary with gray neutrals
- **Typography**: System fonts with proper hierarchy
- **Spacing**: Consistent 4px/8px grid system
- **Components**: Reusable card layouts with hover effects
- **Dark Mode**: Full dark theme support with automatic detection

## 📊 Data Source

Skin and sticker data is sourced from the [CSGO-API](https://github.com/ByMykel/CSGO-API) project, providing:

- Accurate item information
- High-quality images
- Rarity classifications
- Float range data for skins
- Pricing information where available

## 🚀 Performance Optimizations

- **Code splitting** with automatic route-based chunks
- **Image lazy loading** for better perceived performance
- **Query caching** with stale-while-revalidate strategy
- **Efficient re-renders** with proper React patterns
- **Bundle optimization** with Vite's modern build system

---

Built with ❤️ using modern React patterns and TanStack ecosystem.
