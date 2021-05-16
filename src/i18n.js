import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// the translations

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi) // passes i18n down to react-i18next
  .init({
    supportedLngs:['en','fr','ar'],
    fallbackLng: 'en',
    detection: {
      order: [ 'path', 'htmlTag', 'cookie', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;