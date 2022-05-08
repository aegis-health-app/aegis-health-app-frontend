import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AddIcon, Button, ScrollView, Text, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { TourguideContext } from '../../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../../library/rn-multiple-tourguide';
import { UserContext } from '../../contexts/UserContext';
import ReminderItem from '../../components/molecules/ReminderItem';
import ExpansibleToggle from '../../components/atoms/ExpansibleToggle';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import moment from 'moment';
import ReminderGroup from '../../components/molecules/ReminderGroup';
import { UnfinishedReminders } from '../../interfaces/reminders';
import {
  fetchUnfinishedRemindersElderly,
  fetchUnfinishedRemindersCaretaker,
  removeDuplicateReminders
} from '../../utils/reminders';
import { translateDate } from '../../constants/DateTranslations';
import { useSettings } from '../../hooks/useSettings';

const RemindersScreen = () => {
  const { t } = useTranslation();
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showScreen, setShowScreen] = useState<boolean>(true);
  const { isElderly } = useContext(UserContext);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const [reminders, setReminders] = useState<UnfinishedReminders>();
  const [date, setDate] = useState<Date>(new Date());
  const dateFormat = 'dddd, DD MMMM';

  const isFocused = useIsFocused();

  useAsyncEffect(async () => {
    const currentDate = moment(date).add(7, 'h').toDate();

    try {
      if (isElderly) {
        const res = await fetchUnfinishedRemindersElderly(currentDate);
        // console.log(JSON.stringify(res.data, null, '\t'));
        res.data.future = removeDuplicateReminders(res.data.future);
        setReminders(res.data);
      } else {
        const res = await fetchUnfinishedRemindersCaretaker(
          currentElderlyUid,
          currentDate
        );
        // console.log(JSON.stringify(res.data, null, '\t'));
        res.data.future = removeDuplicateReminders(res.data.future);
        setReminders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date, isFocused]);

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
              navigation.navigate('CreateReminderScreen', {
                eid: isElderly ? undefined : currentElderlyUid
              });
            }}>
            <Text display="flex" flexDirection="column" color="white">
              {t('reminders.addReminder')}
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
                navigation.navigate('RemindersCompletedScreen');
              }}>
              {t('reminders.completedReminders')}
            </Button>
          </TourGuideZone>
        </View>
        <ExpansibleToggle
          title="Overdue Activities"
          expand={true}
          divider={true}>
          {reminders && (
            <ReminderGroup data={reminders.overdue} isOverdue={true} />
          )}
        </ExpansibleToggle>
        {reminders?.future.map((item, index) => (
          <ExpansibleToggle
            key={index}
            title={
              language === 'th'
                ? translateDate(moment(item.date).format(dateFormat))
                : moment(item.date).format(dateFormat)
            }
            expand={false}
            divider={true}>
            {item.reminder.map((reminder, index) => (
              <ReminderItem
                key={index}
                data={reminder}
                lastIndex={index === item.reminder.length - 1}
              />
            ))}
          </ExpansibleToggle>
        ))}
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
