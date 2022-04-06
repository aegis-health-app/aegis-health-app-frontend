import { EmotionTrackingState } from '../../dto/modules/emotionTracking.dto';
import { client } from './../../config/axiosConfig';

export async function sendEmotionTrackerOn(uid: number) {
  return await client.post(`/emotion-tracking/${uid}`);
}

export async function sendEmotionTrackerOff(uid: number) {
  return await client.delete(`/emotion-tracking/${uid}`);
}

export async function getIsEmotionTrackingOn(
  uid: number
): Promise<EmotionTrackingState> {
  const { data } = await client.get(`/emotion-tracking/${uid}`);
  return data as EmotionTrackingState;
}
