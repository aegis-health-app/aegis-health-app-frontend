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
    address: 'string'
  });
};
