import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { I18nManager } from 'react-native';


// Import JSON files
import en from './en.json';
import ar from './ar.json';

const resources = { en: { translation: en }, ar: { translation: ar } };


const deviceLanguage = RNLocalize.getLocales()[0]?.languageCode || 'en';
const languageTag = Object.keys(resources).includes(deviceLanguage) ? deviceLanguage : 'en';

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

// Disable RTL by default - only enable for Arabic
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default i18n;
