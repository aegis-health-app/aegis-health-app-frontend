import moment from 'moment';
import {
  EmotionHistory,
  EmotionHistoryResponse
} from '../dto/modules/emotionTracking.dto';
import { client } from '../config/axiosConfig';
import i18n from '../internationalization/i18n.config';

export enum EmotionFrequencyEnum {
  NA = 1,
  BAD = 3,
  NEUTRAL = 5,
  HAPPY = 10
}

export interface EmotionalHistoryFrequency {
  date: Date;
  count: number;
}

export const useEmotionTracker = () => {
  /**
   * This function returns the number of day between month depending on diff params.
   * @param diff Difference in number of month between today.
   * @returns number of date from today.
   */
  function getNumberOfDaysBetweenMonth(diff: number): number {
    if (diff < 0) throw Error('Input cannot be less than zero!');

    const now = moment();
    const to = moment().add(diff, 'months');
    return moment.duration(to.diff(now)).asDays();
  }

  /**
   * This function returns Emotion as number of frequency.
   */
  function getEmotionAsHeatmapFrequency(
    data: EmotionHistory[]
  ): EmotionalHistoryFrequency[] {
    const freq: EmotionalHistoryFrequency[] = [];
    if (data.length === 0) return freq;

    data.forEach((val) => {
      const { date, emotionalLevel } = val;

      if (emotionalLevel === 'BAD') {
        freq.push({ date: date, count: EmotionFrequencyEnum.BAD });
      } else if (emotionalLevel === 'NEUTRAL') {
        freq.push({ date: date, count: EmotionFrequencyEnum.NEUTRAL });
      } else if (emotionalLevel === 'HAPPY') {
        freq.push({ date: date, count: EmotionFrequencyEnum.HAPPY });
      } else {
        freq.push({ date: date, count: EmotionFrequencyEnum.NA });
      }
    });

    return freq;
  }

  function getEmotionFromHeatmapFrequency(date: Date, freq: number): string {
    const displayDate = moment(date).format('L');

    if (freq === EmotionFrequencyEnum.BAD) {
      return `${displayDate}: ${i18n.t('emotionalRecord.BAD')}`;
    } else if (freq === EmotionFrequencyEnum.NEUTRAL) {
      return `${displayDate}: ${i18n.t('emotionalRecord.NEUTRAL')}`;
    } else if (freq === EmotionFrequencyEnum.NA) {
      return `${displayDate}: ${i18n.t('emotionalRecord.NA')}`;
    } else if (freq === EmotionFrequencyEnum.HAPPY) {
      return `${displayDate}: ${i18n.t('emotionalRecord.HAPPY')}`;
    } else {
      return `${displayDate}: ${i18n.t('emotionalRecord.none')}`;
    }
  }

  async function getEmotionHistory(
    uid: number
  ): Promise<EmotionHistoryResponse> {
    const { data } = await client.get(`/emotion-tracking/${uid}/history`);
    return data as EmotionHistoryResponse;
  }

  return {
    getNumberOfDaysBetweenMonth,
    getEmotionAsHeatmapFrequency,
    getEmotionFromHeatmapFrequency,
    getEmotionHistory
  };
};
