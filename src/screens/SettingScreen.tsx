import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Switch, Text } from 'native-base';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { LANGUAGES, useSettings } from '../hooks/useSettings';

import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import { useTranslation } from 'react-i18next';
import { TourguideContext } from '../contexts/TourguideContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { UserContext } from '../contexts/UserContext';

const SettingScreen = () => {
  const { language, changeLanguage, isSoundEffectOn, setIsSoundEffectOn } =
    useSettings();
  const { t } = useTranslation();
  const { showSettingsTourguide, setShowSettingsTourguide } =
    useContext(TourguideContext);
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    eventEmitter, // an object for listening some events
    tourKey
  } = useTourGuideController('setting');
  const [renderTourguide, setRenderTourguide] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUser } = useContext(UserContext);
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
      setShowSettingsTourguide(false);
      await AsyncStorage.setItem('viewedSettingsTourguide', 'true');
    });
  }, [eventEmitter]);

  return (
    <View style={styles.pageContainer}>
      {/* Section: App Settings */}
      <Text fontSize="2xl" fontWeight="700">
        {t('setting.settings')}
      </Text>
      <Spacer />
      <Text fontSize="lg" fontWeight="500" mb={0}>
        {t('setting.header')}
      </Text>
      <Divider my={1} />
      <Spacer />

      {/* Language Toggle */}
      <View style={styles.tourGuideWrapper}>
        {renderTourguide && (
          <TourGuideZone
            tourKey={tourKey}
            zone={1}
            shape="rectangle"
            text={t('settingTutorial.step1')}>
            <View style={styles.settingsItemRow}>
              <View>
                <Text fontSize="md">{t('setting.language')}</Text>
              </View>
              <View style={styles.toggleButtonsContainer}>
                <Button
                  variant={language === LANGUAGES.THAI ? 'solid' : 'outline'}
                  onPress={() => {
                    changeLanguage(LANGUAGES.THAI);
                    setRenderTourguide(false);
                    setTimeout(() => {
                      setRenderTourguide(true);
                    }, 0);
                  }}>
                  ไทย
                </Button>
                <Spacer h={0} />
                <Button
                  variant={language === LANGUAGES.ENGLISH ? 'solid' : 'outline'}
                  onPress={() => {
                    changeLanguage(LANGUAGES.ENGLISH);
                    setRenderTourguide(false);
                    setTimeout(() => {
                      setRenderTourguide(true);
                    }, 0);
                  }}>
                  English
                </Button>
              </View>
            </View>
          </TourGuideZone>
        )}
      </View>
      <Spacer />

      {/* Sound Effect Toggle */}
      {renderTourguide && (
        <TourGuideZone
          tourKey={tourKey}
          zone={2}
          shape="rectangle"
          text={t('settingTutorial.step2')}>
          <View style={styles.settingsItemRow}>
            <View>
              <Text fontSize="md">{t('setting.soundEffect')}</Text>
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
      )}
      <Spacer h={32} />

      {/* Section: Account Settings */}
      {renderTourguide && (
        <TourGuideZone
          tourKey={tourKey}
          zone={3}
          shape="rectangle"
          text={t('settingTutorial.step3')}>
          <Text fontSize="lg" fontWeight="500" mb={0}>
            {t('setting.account')}
          </Text>
          <Divider my={1} />
          <Spacer />
          {/* Change account password */}
          <View style={styles.settingsItemRow}>
            <Button
              size="lg"
              variant="link"
              padding={0}
              colorScheme="secondary"
              fontWeight={900}
              onPress={() =>
                navigation.navigate('ChangeAccountPasswordScreen')
              }>
              {t('setting.changeAccPassword')}
            </Button>
          </View>
          <Spacer />
          {/* Change phone number */}
          <View style={styles.settingsItemRow}>
            <Button
              size="lg"
              variant="link"
              padding={0}
              colorScheme="secondary"
              fontWeight={900}
              onPress={() => navigation.navigate('ChangePhoneNumberScreen')}>
              {t('setting.changePhoneNumber')}
            </Button>
          </View>
        </TourGuideZone>
      )}
      <Spacer />
      {/* Signout */}
      <Button
        size="lg"
        variant="outline"
        colorScheme="secondary"
        onPress={() => {
          AsyncStorage.setItem('token', '');
          setUser(undefined);
          navigation.replace('SignInScreen');
        }}>
        {t('setting.signOut')}
      </Button>
      {renderTourguide && (
        <TourGuideZoneByPosition
          tourKey={tourKey}
          zone={4}
          shape={'circle'}
          isTourGuide
          top={-48}
          right={6}
          width={48}
          height={48}
          text={t('settingTutorial.step4')}
        />
      )}
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
  },
  tourGuideWrapper: {
    height: 40
  }
});
