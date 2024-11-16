import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './assets/locales/en/translation.json';
import gerTranslation from './assets/locales/ger/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ger: { translation: gerTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;