import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES } from '../hooks/useSettings';

const STORE_LANGUAGE_KEY = 'settings.lang';

const languageDetectorPlugin = {
  type: 'languageDetector',
  async: true,
  init: () => null,
  detect: async function (callback: (lang: string) => void) {
    try {
      //get stored language from Async storage
      const language = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (language) {
        //if language was stored before, use this language in the app
        return callback(language);
      } else {
        //if language was not stored yet, use device's locale
        return callback(LANGUAGES.THAI);
      }
    } catch (error) {
      console.log('Error reading language', error);
    }
  },
  cacheUserLanguage: async function (language: string) {
    try {
      //save a user's language choice in Async storage
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  }
};

module.exports = { languageDetectorPlugin };
