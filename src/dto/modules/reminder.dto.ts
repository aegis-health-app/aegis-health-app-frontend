import { ImagePickerResponse } from 'react-native-image-picker';

export interface ReminderInfo {
  title: string;
  startingDateTime: Date;
  isRemindCaretaker: boolean;
  // repetition: RecurringInterval;
  note: string;
  image?: ImagePickerResponse;
  importanceLevel: ImportanceLevel;
  // repeatsEvery?: string
  // repeatsOnDate?: string
  // repeatsOnWeekday?: string[]
  recursion?: RecurringInterval;
  customRecursion?: Recursion;
  eid?: number;
}

export interface EditReminderInfo extends ReminderInfo {
  rid: number;
}

export enum RecurringInterval {
  EVERY_DAY = 'EVERY_DAY',
  EVERY_WEEK = 'EVERY_WEEK',
  EVERY_MONTH = 'EVERY_MONTH',
  CUSTOM = 'CUSTOM',
  DOES_NOT_REPEAT = 'DOES_NOT_REPEAT'
}

export interface Recursion {
  period: RecursionPeriod;
  days?: number[]; //(1 | 2 | 3 | 4 | 5 | 6 | 7)[];
  date?: number;
}

export enum RecursionPeriod {
  WEEK = 'WEEK',
  MONTH = 'MONTH'
}

export enum ImportanceLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

type RecursionDay = [0 | 1 | 2 | 3 | 4 | 5 | 6 | 7];
export type Reminder = {
  title: string;
  startingDateTime: Date;
  isRemindCaretaker: boolean;
  note: string;
  importanceLevel: 'Low' | 'Medium' | 'High';
  recursion?: 'EVERY_DAY' | 'EVERY_MONTH' | 'EVERY_WEEK';
  customRecursion?: Recursion;
  uid: number;
  imageid: string;
};
