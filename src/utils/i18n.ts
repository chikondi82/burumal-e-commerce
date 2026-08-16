import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import rn from './locales/rn.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  rn: { translation: rn },
};

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
