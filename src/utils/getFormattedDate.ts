import moment from 'moment';
import { LANGUAGES } from '../hooks/useSettings';

export const getFormattedDate = (tempDate: Date, language: string) => {
  const momentDate = moment(tempDate, 'MM/DD/YYYY');
  if (language === LANGUAGES.THAI) momentDate.add(543, 'years');
  return momentDate.format('MM/DD/YYYY');
};

export const getFormattedDateLong = (tempDate: Date, language: string) => {
  const momentDate = moment(tempDate, 'MM/DD/YYYY');
  if (language === LANGUAGES.THAI) momentDate.add(543, 'years');
  return momentDate.format('DD MMMM YYYY');
};

export const getFormattedDateTime = (tempDate: Date, language: string) => {
  const momentDate = moment(tempDate, 'MM/DD/YYYY HH:mm');
  if (language === LANGUAGES.THAI) momentDate.add(543, 'years');
  return momentDate.format('DD MMMM YYYY HH:mm');
};

export const getFormattedTime = (tempDate: Date) => {
  const momentDate = moment(tempDate, 'HH:mm');
  return momentDate.format('HH:mm');
};
