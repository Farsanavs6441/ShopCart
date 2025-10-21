# ShopCart - React Native E-Commerce App

A feature-rich e-commerce mobile application built with React Native, featuring product browsing, cart management, favorites, and multi-language support.

## Features

- 📱 Product listing with search, filters, and categories
- 🛒 Shopping cart with quantity management
- ❤️ Favorites/wishlist functionality
- 🌍 Multi-language support (English/Arabic) with RTL
- 🌓 Dark mode support
- 🔗 Deep linking (myshop://product/:id)
- 💾 Offline caching with AsyncStorage
- 🎨 Skeleton loaders and empty states
- 📤 Product sharing
- 🏷️ Promo code support

## Prerequisites

- Node.js >= 20
- React Native development environment ([Setup Guide](https://reactnative.dev/docs/set-up-your-environment))
- For Android: Android Studio, JDK 17
- For iOS: Xcode, CocoaPods

## Setup & Installation

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Farsanavs6441/ShopCart.git
cd ShopCart
npm install
```

### 2. Start Local API Server

```bash
npm run api
```

This starts json-server at `https://delmer-superadorn-luba.ngrok-free.dev` serving 12 products from `db.json`.

### 3. Start Metro Bundler

```bash
npm start
```

## Running the App

### Android (Primary Platform)

```bash
# Start emulator or connect device
npm run android
```

**Build APK:**
```bash
cd android
./gradlew assembleRelease
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### iOS

```bash
# Install pods (first time only)
cd ios && pod install && cd ..

# Run on simulator
npm run ios

# Run on device
npm run ios -- --device
```

## Testing

### Deep Links

**Android:**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "myshop://product/p-1001"
```
# deep link work for installed app if outside app ,the above command will take to app
**iOS:**
```bash
xcrun simctl openurl booted "myshop://product/p-1001"
```

### Promo Code
Use code `SAVE10` for 10% discount in cart.

## Architecture

### State Management
- **Redux Toolkit** for global state (cart, favorites, products)
- **Redux Persist** with AsyncStorage for data persistence
- Local component state with React hooks

### Data Fetching
- **Axios** for API calls
- **json-server** for local mock API
- Offline-first with cached product list
- Error handling with retry functionality

### Navigation
- **React Navigation** (Stack + Bottom Tabs)
- Deep linking configured for product pages
- Nested navigators for Products tab

### Internationalization
- **i18next** + **react-i18next**
- RTL support with I18nManager
- English and Arabic translations

### Styling
- Custom theme system with dark mode
- React Native StyleSheet
- Responsive layouts with Dimensions API

### Key Libraries
- `@reduxjs/toolkit` - State management
- `@react-navigation/native` - Navigation
- `react-i18next` - Internationalization
- `redux-persist` - State persistence
- `axios` - HTTP client
- `json-server` - Mock API

## Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable components
├── features/         # Feature modules
│   ├── cart/        # Cart slice and screen
│   ├── favorites/   # Favorites slice and screen
│   └── products/    # Products slice and screens
├── i18n/            # Translations (en.json, ar.json)
├── navigation/      # Navigation configuration
├── store/           # Redux store setup
├── theme/           # Theme provider and colors
└── utils/           # Helper functions
```

## API Endpoints

- `GET /products` - List all products
- `GET /products/:id` - Get product by ID

## Known Issues

- React Native 0.82 has compatibility issues with react-native-reanimated
- For real devices, update API_URL to your computer's IP address

## Environment Configuration

**For Real Devices:**
Update `src/api/products.ts`:
```typescript
const API_URL = 'http://YOUR_IP:3000'; // e.g., http://192.168.1.4:3000
```

## Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run api` - Start json-server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## License

MIT
