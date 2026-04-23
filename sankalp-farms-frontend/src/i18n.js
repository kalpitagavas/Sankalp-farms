import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your files
import en from './locales/en.json';
import mr from './locales/mr.json';
import hi from './locales/hi.json';
import gu from './locales/gu.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      mr: { translation: mr },
      hi: { translation: hi },
      gu: { translation: gu }
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;