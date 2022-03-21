import i18n from './i18n.config';

export const useLanguage = () => {
  const language = () => {
    return i18n.language;
  };

  const changeLanguage = (lang: string) => {
    console.log(lang);
    i18n.changeLanguage(lang);
  };

  return { language, changeLanguage };
};
