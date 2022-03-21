import { useState } from 'react';
import i18n from '../internationalization/i18n.config';

export const LANGUAGES = {
  THAI: 'th',
  ENGLISH: 'en'
};

export const useSettings = () => {
  const [language, setLanguage] = useState(i18n.language);
  const [isSoundEffectOn, setIsSoundEffectOn] = useState(true);

  const changeLanguage = (lang: string) => {
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return {
    language,
    setLanguage,
    changeLanguage,
    isSoundEffectOn,
    setIsSoundEffectOn
  };
};
