import { client } from '../../config/axiosConfig';
import { reverseGeocode } from '../geolocation';

export const registerFCMToken = async (token) => {
  return await client.post('notification/register-device', {
    registrationToken: token
  });
};

export const sendEmergencySignal = async ({ latitude, longtitude }) => {
  const address = await reverseGeocode(latitude, longtitude);

  return await client.post('notification/emergency', {
    latitude,
    longtitude,
    address
  });
};

export const sendEmergencyCancel = async () => {
  return await client.get('notification/emergency/cancel');
};
