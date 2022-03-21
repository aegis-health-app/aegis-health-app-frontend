import { View, Text, Radio, Image } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, useSettings } from './../../hooks/useSettings';
import { StyleSheet } from 'react-native';

const OnBoardingLanguageSelector = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useSettings();
  const [selected, setSelected] = useState(language);

  useEffect(() => {
    changeLanguage(selected);
  }, [selected]);

  return (
    <View px={4} w="80">
      <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={selected}
        onChange={(language) => {
          setSelected(language);
        }}>
        <View
          h="12"
          borderRadius={10}
          borderWidth={2}
          borderColor="gray.200"
          w="full"
          my={2}>
          <Radio
            value={LANGUAGES.THAI}
            my={1}
            ml={2}
            size="lg"
            w="100%"
            justifyContent="flex-start">
            <View flexDir="row" justifyContent="flex-start">
              <Image
                source={require('../../assets/images/th.png')}
                style={styles.language}
                alt="Thai"
              />
              <Text bold fontSize="xl">
                {t('112')}
              </Text>
            </View>
          </Radio>
        </View>
        <View
          h="12"
          borderRadius={10}
          borderWidth={2}
          borderColor="gray.200"
          w="full">
          <Radio
            value={LANGUAGES.ENGLISH}
            my={1}
            ml={2}
            size="lg"
            w="100%"
            justifyContent="flex-start">
            <View flexDir="row" justifyContent="flex-start">
              <Image
                source={require('../../assets/images/en.png')}
                style={styles.language}
                alt="English"
              />
              <Text bold fontSize="xl">
                {t('111')}
              </Text>
            </View>
          </Radio>
        </View>
      </Radio.Group>
    </View>
  );
};

export default OnBoardingLanguageSelector;

const styles = StyleSheet.create({
  language: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    resizeMode: 'contain'
  }
});
