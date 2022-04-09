import React, { useContext, useEffect, useState } from 'react';
import { Button, ScrollView, View, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
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
import { client } from '../config/axiosConfig';
import { UserContext } from '../contexts/UserContext';
import { HealthRecording } from '../interfaces/healthRecording';
import { CaretakerContext } from '../contexts/CaretakerContext';

const HealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);
  const [myTemplates, setMyTemplates] = useState<HealthRecording[]>([]);

  const { currentElderlyUid } = useContext(CaretakerContext);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      if (user?.isElderly) {
        try {
          const res = await client.get('/healthrecord/getAll/elderly');
          setMyTemplates(res.data.listHealthRecord);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const payload = {
            elderlyuid: currentElderlyUid
          };
          const res = await client.post(
            '/healthrecord/getAll/caretaker',
            payload
          );
          setMyTemplates(res.data.listHealthRecord);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [user]);

  // tour guide copied and modified from settings screen

  const { showHealthRecordingsTourguide, setShowHealthRecordingsTourguide } =
    useContext(TourguideContext);
  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController();

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

  useEffect(() => {
    if (canStart && showHealthRecordingsTourguide && start) start();
  }, [canStart, showHealthRecordingsTourguide]);

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
                  image={template.imageid}
                  hrName={template.hrName}
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
                image={template.imageid}
                hrName={t(template.hrName)}
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
