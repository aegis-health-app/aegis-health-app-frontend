import { useState } from 'react';

export const LANGUAGES = {
  THAI: 'TH',
  ENGLISH: 'EN'
};

export const useSettings = () => {
  const [language, setLanguage] = useState(LANGUAGES.ENGLISH);
  const [isSoundEffectOn, setIsSoundEffectOn] = useState(true);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return {
    language,
    setLanguage,
    changeLanguage,
    isSoundEffectOn,
    setIsSoundEffectOn
  };
};
