import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import teTranslations from '../locales/te.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      te: {
        translation: teTranslations,
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n; 