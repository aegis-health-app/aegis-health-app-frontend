import React, { useContext, useEffect } from 'react';
import { Button, ScrollView, View, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import images from '../assets/images';
import HealthRecordingCard from '../components/molecules/HealthRecordingCard';
import { StyleSheet } from 'react-native';
import { HealthRecording } from '../interfaces/HealthRecording';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../library/rn-multiple-tourguide';

const HealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const myTemplates: HealthRecording[] = [
    {
      hrName: 'healthRecordingsTemplates.bloodPressure',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.bloodSugarLevel',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.heartRate',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.fever',
      imageId: ''
    }
  ];

  // tour guide copied and modified from settings screen

  const { showHealthRecordingsTourguide, setShowHealthRecordingsTourguide } =
    useContext(TourguideContext);
  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
    tourKey
  } = useTourGuideController();

  /*
  This useEffect will determine whether the tourguide should be shown
  The guide should be shown automatically only on the first open of the page
  The 'viewedSettingsTourguide' is the name of the key in AsyncStorage that stores
  whether this specific tour guide has been viewed yet. If viewd, it returns true.
  */
  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem(
        'viewedHealthRecordingsTourguide'
      );
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowHealthRecordingsTourguide(shouldShow);
  }, [AsyncStorage, showHealthRecordingsTourguide]);

  /*
  This useEffect will start the tour guide when the component is ready
  and the condition is met.
  */
  useEffect(() => {
    if (canStart && showHealthRecordingsTourguide && start) start();
  }, [canStart, showHealthRecordingsTourguide]);

  /*
  This useEffect will allow you to run script when a specific event
  of the tourguide is triggered.
  */
  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowHealthRecordingsTourguide(false);
      await AsyncStorage.setItem('viewedHealthRecordingsTourguide', 'true');
    });
  }, [eventEmitter]);

  // -----------------------

  return (
    <>
      <View
        style={styles.buttonContainer}
        backgroundColor="#fff"
        p={4}
        zIndex={1}>
        <TourGuideZone
          tourKey={tourKey}
          zone={1}
          shape="rectangle"
          text={t('healthRecordingsTutorial.step1')}>
          <Button
            onPress={() => {
              stop();
              navigation.navigate('CreateHealthRecordingsScreen');
            }}>
            {t('healthRecordings.addRecording')}
          </Button>
        </TourGuideZone>
      </View>
      <ScrollView flex={1}>
        {myTemplates.map((template, i) => (
          <>
            {i === 0 ? (
              <TourGuideZone
                tourKey={tourKey}
                zone={2}
                shape="rectangle"
                text={t('healthRecordingsTutorial.step2')}>
                <HealthRecordingCard
                  key={i}
                  backgroundColor="#fff"
                  image={images.selfCare}
                  header={t(template.hrName)}
                  handlePress={() => {
                    stop();
                    console.log('card pressed');
                  }}
                />
              </TourGuideZone>
            ) : (
              <HealthRecordingCard
                key={i}
                backgroundColor="#fff"
                image={images.selfCare}
                header={t(template.hrName)}
                handlePress={() => console.log('card pressed')}
              />
            )}
          </>
        ))}
        <VStack px={4} flex={1}>
          {myTemplates.map}
        </VStack>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});

export default HealthRecordingsScreen;
