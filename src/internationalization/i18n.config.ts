import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../internationalization/translations/en.json';
import th from '../internationalization/translations/th.json';

const {
  languageDetectorPlugin
} = require('../internationalization/languageDetectorPlugin');

//empty for now
const resources = {
  en: {
    translation: en
  },
  th: {
    translation: th
  }
};

i18n
  .use(initReactI18next)
  .use(languageDetectorPlugin)
  .init({
    resources,
    //language to use if translations in user language are not available
    fallbackLng: 'th',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false // not needed for react!!
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
