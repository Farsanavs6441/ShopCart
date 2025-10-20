import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';

const resources = {
  en: {
    translation: {
      productListTitle: 'Products',
      retry: 'Retry',
      noProducts: 'No products found',
      noProductsMessage: 'Check back later for new items',
      error: 'Something went wrong',
      errorMessage: 'Failed to load products. Please try again.',
      favorites: 'Favorites',
      cart: 'Cart',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      language: 'Language',
      loading: 'Loading...',
      'Add to Cart': 'Add to Cart',
      addToCart: 'Add to Cart',
      currency: '$',
      currencyPosition: 'before',
      searchProducts: 'Search products...',
    },
  },
  
  ar: {
    translation: {
      productListTitle: 'المنتجات',
      retry: 'إعادة المحاولة',
      noProducts: 'لا توجد منتجات',
      noProductsMessage: 'تحقق لاحقاً للعناصر الجديدة',
      error: 'حدث خطأ ما',
      errorMessage: 'فشل تحميل المنتجات. يرجى المحاولة مرة أخرى.',
      favorites: 'المفضلة',
      cart: 'السلة',
      addToFavorites: 'إضافة إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      language: 'اللغة',
      loading: 'جاري التحميل...',
      'Add to Cart': 'أضف إلى السلة',
      addToCart: 'أضف إلى السلة',
      currency: 'د.إ',
      currencyPosition: 'after',
      searchProducts: 'البحث عن المنتجات...',
    },
  },
};

const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';
const languageTag = Object.keys(resources).includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
