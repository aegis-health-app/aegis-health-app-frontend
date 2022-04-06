import { client } from './../../config/axiosConfig';

export async function sendEmotionTrackerOn(uid: number) {
  return await client.post(`/emotion-tracking/${uid}`);
}

export async function sendEmotionTrackerOff(uid: number) {
  return await client.delete(`/emotion-tracking/${uid}`);
}
