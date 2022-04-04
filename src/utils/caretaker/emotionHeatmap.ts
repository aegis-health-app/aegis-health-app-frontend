import moment from 'moment';
import { EmotionalHistory } from './../../dto/modules/emotionRecord';

/**
 * This function returns the number of day between month depending on diff params.
 * @param diff Difference in number of month between today.
 * @returns number of date from today.
 */
export function getNumberOfDaysBetweenMonth(diff: number): number {
  if (diff < 0) throw Error('Input cannot be less than zero!');

  const now = moment();
  const to = moment().add(diff, 'months');
  return moment.duration(to.diff(now)).asDays();
}

export interface EmotionalHistoryFrequency {
  date: Date;
  count: number;
}

export enum EmotionFrequencyEnum {
  NA = 2,
  BAD = 3,
  NEUTRAL = 5,
  HAPPY = 10
}

/**
 * This function returns Emotion as number of frequency.
 */
export function getEmotionAsHeatmapFrequency(
  data: EmotionalHistory[]
): EmotionalHistoryFrequency[] {
  const freq: EmotionalHistoryFrequency[] = [];
  if (data.length === 0) return freq;

  data.forEach((val) => {
    const { date, emotion } = val;

    if (emotion === 'BAD') {
      freq.push({ date: date, count: EmotionFrequencyEnum.BAD });
    } else if (emotion === 'NEUTRAL') {
      freq.push({ date: date, count: EmotionFrequencyEnum.NEUTRAL });
    } else if (emotion === 'HAPPY') {
      freq.push({ date: date, count: EmotionFrequencyEnum.HAPPY });
    } else {
      freq.push({ date: date, count: EmotionFrequencyEnum.NA });
    }
  });

  return freq;
}
