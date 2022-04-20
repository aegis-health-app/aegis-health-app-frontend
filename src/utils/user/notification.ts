import { Vibration } from 'react-native';
import { client } from '../../config/axiosConfig';

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
