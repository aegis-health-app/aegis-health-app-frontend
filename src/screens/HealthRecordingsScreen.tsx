import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddIcon, Button, ScrollView, Text, View, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import HealthRecordingCard from '../components/molecules/HealthRecordingCard';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import { UserContext } from '../contexts/UserContext';
// import { HealthRecording } from '../interfaces/healthRecording';
import { HealthRecordContext } from '../contexts/HealthRecordContext';

const HealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);
  const [showScreen, setShowScreen] = useState<boolean>(true);

  const {
    setCurrentHrName,
    setCurrentHrImage,
    myTemplates,
    fetchHealthRecordings
  } = useContext(HealthRecordContext);

  useAsyncEffect(async () => {
    if (!user) return;
    fetchHealthRecordings();
  }, [user]);

  // tour guide copied and modified from settings screen

  const { showHealthRecordingsTourguide, setShowHealthRecordingsTourguide } =
    useContext(TourguideContext);
  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController();

  useAsyncEffect(async () => {
    if (showHealthRecordingsTourguide) return;
    const fetchData = async () => {
      const result = await AsyncStorage.getItem(
        'viewedHealthRecordingsTourguide'
      );
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowHealthRecordingsTourguide(shouldShow);
  }, [AsyncStorage]);

  useEffect(() => {
    if (canStart && showHealthRecordingsTourguide && start) start();
  }, [canStart, showHealthRecordingsTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowHealthRecordingsTourguide(false);
      await AsyncStorage.setItem('viewedHealthRecordingsTourguide', 'true');
    });
  }, [eventEmitter]);

  useFocusEffect(
    useCallback(() => {
      setShowScreen(false);
      setTimeout(() => {
        setShowScreen(true);
      }, 0);
    }, [])
  );

  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 0);
  }, [showHealthRecordingsTourguide]);

  if (!show || !showScreen) return null;

  return (
    <View flex={1} mb={4}>
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
            <Text display="flex" flexDirection="column" color="white">
              {t('healthRecordings.addRecording')}{' '}
              <AddIcon size="3" color="white" />
            </Text>
          </Button>
        </TourGuideZone>
      </View>
      <ScrollView flex={1} mx={4}>
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
                  image={template.imageid + '?' + new Date()}
                  hrName={template.hrName}
                  handlePress={() => {
                    stop();
                    setCurrentHrName(template.hrName);
                    setCurrentHrImage(template.imageid + '?' + new Date());
                    navigation.navigate('AddHealthEntryScreen');
                  }}
                />
              </TourGuideZone>
            ) : (
              <HealthRecordingCard
                key={i}
                backgroundColor="#fff"
                image={template.imageid + '?' + new Date()}
                hrName={t(template.hrName)}
                handlePress={() => {
                  setCurrentHrName(template.hrName);
                  setCurrentHrImage(template.imageid + '?' + new Date());
                  navigation.navigate('AddHealthEntryScreen');
                }}
              />
            )}
          </>
        ))}
        <VStack px={4} flex={1}>
          {myTemplates.map}
        </VStack>
      </ScrollView>
    </View>
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
