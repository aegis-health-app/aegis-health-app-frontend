<<<<<<< HEAD
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
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

interface SwitchState {
  lastEdit: Date | null;
  amount: number;
}

/**
 * This function return switch state.
 * @returns lastEdit: the last time user change the switch, amount: how much the switch is changed today.
 */

export async function getSwitchState(): Promise<SwitchState> {
  const result = await AsyncStorage.getItem('emotionTrackingSwitch');
  return result
    ? (JSON.parse(result) as SwitchState)
    : { lastEdit: null, amount: 0 };
}

/**
 * This function will get execute every time the switch has been changed.
 * It is used to limit sending rate of the function.
 * It will allow switch to change if the user changes less than 4 times today, else, return error message.
 *
 * @returns switch limit status or undefined
 */
export async function saveSwitchState(now: Date): Promise<number> {
  const { amount } = await getSwitchState();

  if (amount < 3) {
    const increment = amount + 1;
    await AsyncStorage.setItem(
      'emotionTrackingSwitch',
      JSON.stringify({ lastEdit: now, amount: increment })
    );
    return increment;
  }
  return 4;
}

/**
 * This function will get execute once a day. It clears switch state's amount if difference between
 * the current time and the user's last edit is more than 1 day.
 */
export async function clearSwitchState(now: Date) {
  const { lastEdit } = await getSwitchState();
  const momLastEdit = moment(lastEdit);
  const dateTimeDifference = moment.duration(moment(now).diff(momLastEdit));
  if (dateTimeDifference.asHours() >= 24) {
    await AsyncStorage.setItem(
      'emotionTrackingSwitch',
      JSON.stringify({ lastEdit: lastEdit, amount: 0 })
    );
  }

  return await getSwitchState();
>>>>>>> 535c4b0 (feat: add emotional tracking switch state checker & limit)
}
