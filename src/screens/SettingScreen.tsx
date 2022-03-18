import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Switch, Text } from 'native-base';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { LANGUAGES, useSettings } from '../hooks/useSettings';

import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useTranslation } from 'react-i18next';

const SettingScreen = () => {
  const { language, changeLanguage, isSoundEffectOn, setIsSoundEffectOn } =
    useSettings();
  const { t } = useTranslation();

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter // an object for listening some events
  } = useTourGuideController();

  useEffect(() => {
    if (canStart) {
      if (start) {
        start();
      }
    }
  }, [canStart]);

  React.useEffect(() => {
    eventEmitter?.on('start', () => console.log('start'));
    eventEmitter?.on('stop', () => {
      console.log('stop');
      if (stop) {
        stop();
      }
    });
    eventEmitter?.on('stepChange', () => console.log('stepChange'));

    // @ts-ignore
    return () => eventEmitter?.off('*', null);
  }, []);

  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity
        onPress={() => {
          if (start) {
            start();
          }
        }}>
        <Text fontSize="2xl" fontWeight="700">
          {t('2')}
        </Text>
      </TouchableOpacity>
      <Spacer />
      <Text fontSize="lg" fontWeight="500" mb={0}>
        {t('3')}
      </Text>
      <Divider my={1} />
      <Spacer />
      <TourGuideZone
        zone={1}
        shape="rectangle"
        text={'With animated SVG morphing with awesome flubber 🍮💯'}>
        <View style={styles.settingsItemRow}>
          <View>
            <Text fontSize="md">{t('4')}</Text>
          </View>
          <View style={styles.toggleButtonsContainer}>
            <Button
              variant={language === LANGUAGES.THAI ? 'solid' : 'outline'}
              onPress={() => changeLanguage(LANGUAGES.THAI)}>
              ไทย
            </Button>
            <Spacer h={0} />
            <Button
              variant={language === LANGUAGES.ENGLISH ? 'solid' : 'outline'}
              onPress={() => changeLanguage(LANGUAGES.ENGLISH)}>
              English
            </Button>
          </View>
        </View>
      </TourGuideZone>
      <Spacer />
      <TourGuideZone zone={2} shape="rectangle" text={'Zone 2'}>
        <View style={styles.settingsItemRow}>
          <View>
            <Text fontSize="md">{t('5')}</Text>
          </View>
          <View>
            <Switch
              size="sm"
              isChecked={isSoundEffectOn}
              onToggle={() => setIsSoundEffectOn(!isSoundEffectOn)}
            />
          </View>
        </View>
      </TourGuideZone>
      <Spacer h={32} />
      <TourGuideZone zone={3} shape="rectangle" text={'Zone 2'}>
        <Text fontSize="lg" fontWeight="500" mb={0}>
          {t('6')}
        </Text>
        <Divider my={1} />
        <Spacer />
        <View style={styles.settingsItemRow}>
          <Button
            size="lg"
            variant="link"
            padding={0}
            colorScheme="secondary"
            fontWeight={900}>
            {t('7')}
          </Button>
        </View>
        <Spacer />
        <View style={styles.settingsItemRow}>
          <Button
            size="lg"
            variant="link"
            padding={0}
            colorScheme="secondary"
            fontWeight={900}>
            {t('8')}
          </Button>
        </View>
      </TourGuideZone>
      <Spacer />
      <Button size="lg" variant="outline" colorScheme="secondary">
        {t('12')}
      </Button>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  settingsItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  }
});
