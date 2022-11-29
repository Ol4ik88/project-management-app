import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';
import Backend from 'i18next-http-backend';

export const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: resources,
    fallbackLng: localStorage.getItem('lang') ?? 'en',
  });
export default i18n;
