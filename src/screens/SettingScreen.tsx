import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Button, Switch, Text } from 'native-base';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { LANGUAGES, useSettings } from '../hooks/useSettings';

import { TourGuideZone, useTourGuideController } from 'rn-tourguide';
import { useTranslation } from 'react-i18next';
import { TourguideContext } from '../contexts/TourguideContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';

const SettingScreen = () => {
  const { language, changeLanguage, isSoundEffectOn, setIsSoundEffectOn } =
    useSettings();
  const { t } = useTranslation();
  const { showSettingsTourguide, setShowSettingsTourguide } =
    useContext(TourguideContext);
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter // an object for listening some events
  } = useTourGuideController();

  /*
    This useEffect will determine whether the tourguide should be shown
    The guide should be shown automatically only on the first open of the page
    The 'viewedSettingsTourguide' is the name of the key in AsyncStorage that stores
    whether this specific tour guide has been viewed yet. If viewd, it returns true.
  */
  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedSettingsTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowSettingsTourguide(shouldShow);
  }, [AsyncStorage, showSettingsTourguide]);

  /*
    This useEffect will start the tour guide when the component is ready
    and the condition is met.
  */
  useEffect(() => {
    if (canStart && showSettingsTourguide && start) start();
  }, [canStart, showSettingsTourguide]);

  /*
    This useEffect will allow you to run script when a specific event
    of the tourguide is triggered.
  */
  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      console.log('stop');
      if (stop) {
        setShowSettingsTourguide(false);
        await AsyncStorage.setItem('viewedSettingsTourguide', 'true');
        stop();
      }
    });
    // @ts-ignore
    return () => eventEmitter?.off('*', null);
  }, []);

  return (
    <View style={styles.pageContainer}>
      <TouchableOpacity
        onPress={async () => {
          if (start) {
            setShowSettingsTourguide(true);
            await AsyncStorage.setItem('viewedSettingsTourguide', 'false');
            // start();
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
