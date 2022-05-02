import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import moment from 'moment';
import { Vibration } from 'react-native';
import { client } from '../../config/axiosConfig';
import { NotificationType } from '../../constants/NotificationType';
import { EmergencyInfo } from '../../screens/EmergencyInfoScreen';

export type NotificationFeed = {
  emergency: Notification[];
  reminder: Notification[];
};

export type Notification = ReminderNoti | EmergencyNoti;

export type EmergencyNoti = EmergencyInfo & { messageType: NotificationType };
export type ReminderNoti = {
  title: string;
  note: string;
  isDone: boolean;
  startingDateTime: Date;
  user: string;
  rid: number;

  messageType?: NotificationType;
};

export const determineMessageType = (data) => {
  if (data.latitude) return NotificationType.EMERGENCY;
  if (data.isCancelled) return NotificationType.EMERGENCY_CANCEL;
  return NotificationType.REMINDER;
};

export const registerFCMToken = async (token) => {
  return await client.post('notification/register-device', {
    registrationToken: token
  });
};

export const sendEmergencySignal = async ({ latitude, longtitude }) => {
  return await client.post('notification/emergency', {
    latitude,
    longtitude,
    address: ''
  });
};

export const sendEmergencyCancel = async () => {
  return await client.get('notification/emergency/cancel');
};

export const startEmergencyVibration = () => {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [1 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS];

  Vibration.vibrate(PATTERN, true);
};

export const cancelVibration = () => Vibration.cancel();

export const getNotificationFeed: () => Promise<NotificationFeed> =
  async () => {
    const rawFeedList = await AsyncStorage.getItem('Aegis_NotiFeedList');
    const feed = rawFeedList
      ? await JSON.parse(rawFeedList)
      : ({ emergency: [], reminder: [] } as NotificationFeed);
    return feed;
  };

export const storeNotificationFeed = (feed: NotificationFeed) => {
  AsyncStorage.setItem('Aegis_NotiFeedList', JSON.stringify(feed));
};

export const handleBackgroundMessage = async (
  message: FirebaseMessagingTypes.RemoteMessage
) => {
  const { data } = message;
  const type = determineMessageType(data);

  if (type === NotificationType.EMERGENCY) {
    const emergencyPayload: EmergencyInfo = {
      address: data?.address ?? '',
      elderlyImageId: data?.elderlyImageId ?? '',
      name: data?.elderlyName ?? '',
      phone: data?.elderlyPhone ?? '',
      location: {
        latitude: parseFloat(data?.latitude ?? ''),
        longtitude: parseFloat(data?.longtitude ?? '')
      },
      date: moment(data?.timestamp).format('DD MMM YYYY') ?? '',
      time: moment(data?.timestamp).format('hh:mm:ss') ?? ''
    };

    const feed = await getNotificationFeed();
    console.log(feed);
    feed?.emergency?.push({
      ...emergencyPayload,
      messageType: NotificationType.EMERGENCY
    });

    storeNotificationFeed(feed);

    startEmergencyVibration();
  }
};
