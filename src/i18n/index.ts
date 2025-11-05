import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';


// Import JSON files
import en from './en.json';
import ar from './ar.json';

const resources = { en: { translation: en }, ar: { translation: ar } };


// Always default to English to avoid RTL issues on some devices
const languageTag = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: languageTag,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });

// Force LTR on app init, only enable RTL when Arabic is selected
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  const shouldBeRTL = lng === 'ar';
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }
});

export default i18n;
