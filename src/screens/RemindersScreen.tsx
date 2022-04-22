import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddIcon, Button, ScrollView, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import { UserContext } from '../contexts/UserContext';
import ReminderItem from '../components/molecules/ReminderItem';

const RemindersScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);
  const [showScreen, setShowScreen] = useState<boolean>(true);

  useAsyncEffect(async () => {
    if (!user) return;
    // fetchReminders();
  }, [user]);

  // tour guide copied and modified from settings screen

  const { showRemindersTourguide, setShowRemindersTourguide } =
    useContext(TourguideContext);
  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController();

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedRemindersTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowRemindersTourguide(shouldShow);
  }, [AsyncStorage, showRemindersTourguide]);

  useEffect(() => {
    if (canStart && showRemindersTourguide && start) start();
  }, [canStart, showRemindersTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowRemindersTourguide(false);
      await AsyncStorage.setItem('viewedRemindersTourguide', 'true');
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

  if (!showScreen) return null;

  const reminders = [
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    },
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    },
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    }
  ];

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
          text={t('remindersTutorial.step1')}>
          <Button
            onPress={() => {
              stop();
            }}>
            <Text display="flex" flexDirection="column" color="white">
              {t('reminders.addReminder')}
              {/* {t('healthRecordings.addRecording')}{' '} */}
              <AddIcon size="3" color="white" />
            </Text>
          </Button>
        </TourGuideZone>
      </View>
      <ScrollView flex={1} mx={4}>
        <View py={4}>
          <TourGuideZone
            tourKey={tourKey}
            zone={2}
            shape="rectangle"
            text={t('remindersTutorial.step2')}>
            <Button
              variant="outline"
              onPress={() => {
                stop();
              }}>
              {t('reminders.completedReminders')}
            </Button>
          </TourGuideZone>
        </View>
        <ReminderItem />
        <ReminderItem />
        {/* {reminders.map((reminder, i) => (
          <>
            {i === 0 ? (
              <TourGuideZone
                tourKey={tourKey}
                zone={3}
                shape="rectangle"
                text={t('healthRecordingsTutorial.step2')}>
                <HealthRecordingCard
                  key={i}
                  backgroundColor="#fff"
                  image={reminder.imageid}
                  hrName={reminder.hrName}
                  handlePress={() => {
                    stop();
                    console.log('press');
                  }}
                />
              </TourGuideZone>
            ) : (
              <HealthRecordingCard
                key={i}
                backgroundColor="#fff"
                image={reminder.imageid}
                hrName={t(reminder.hrName)}
                handlePress={() => {
                  console.log('press');
                }}
              />
            )}
          </>
        ))} */}
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

export default RemindersScreen;
