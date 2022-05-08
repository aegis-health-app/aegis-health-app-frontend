import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HStack, Text, View } from 'native-base';
import InCallManager from 'react-native-incall-manager';
import ModuleAlertCard from '../molecules/ModuleAlertCard';
import { useTranslation } from 'react-i18next';
import { AppState } from 'react-native';
import EmergencyAlertCard from '../molecules/EmergencyAlertCard';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import {
  EmergencyNoti,
  getNotificationFeed,
  handleBackgroundMessage,
  ReminderNoti,
  storeNotificationFeed
} from '../../utils/user/notification';
import { firebase } from '@react-native-firebase/messaging';

const UpComingAlert = () => {
  const { t } = useTranslation();

  const [reminderList, setReminderList] = useState<ReminderNoti[]>([]);
  const [emergencyList, setEmergencyList] = useState<EmergencyNoti[]>([]);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const refreshFeed = useCallback(async () => {
    const feed = await getNotificationFeed();
    setEmergencyList(feed.emergency as EmergencyNoti[]);
    setReminderList(feed.reminder as ReminderNoti[]);
  }, [setEmergencyList, setReminderList]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        InCallManager.stopRingtone();
        InCallManager.stop();
        //App has come to the foreground
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .messaging()
      .onMessage(async (remoteMessage) => {
        await handleBackgroundMessage(remoteMessage);
        await refreshFeed();
      });

    return unsubscribe;
  }, []);

  useAsyncEffect(async () => {
    refreshFeed();
  }, [appStateVisible]);

  const dismissNotification = useCallback(async () => {
    const feed = await getNotificationFeed();
    if (feed.emergency.length > 0)
      feed.emergency.splice(feed.emergency.length - 1);
    else if (feed.reminder.length > 0)
      feed.reminder.splice(feed.reminder.length - 1);

    console.log(feed);
    await storeNotificationFeed(feed);

    setEmergencyList(feed.emergency as EmergencyNoti[]);
    setReminderList(feed.reminder as ReminderNoti[]);
  }, [setEmergencyList]);

  return (
    <View w="full" mt={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="600" mb={4}>
          {t('modules.notification')}
        </Text>
      </HStack>
      {emergencyList.length > 0 ? (
        <EmergencyAlertCard
          sender={emergencyList[emergencyList.length - 1].name}
          time={emergencyList[emergencyList.length - 1].time}
          notification={emergencyList[emergencyList.length - 1]}
          dismissNotification={dismissNotification}
        />
      ) : (
        <>
          {reminderList.length > 0 && (
            <ModuleAlertCard
              notification={reminderList[reminderList.length - 1]}
              dismissNotification={dismissNotification}
            />
          )}
        </>
      )}
    </View>
  );
};

export default UpComingAlert;
