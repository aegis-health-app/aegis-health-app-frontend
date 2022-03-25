import moment from 'moment';
import { LANGUAGES } from '../hooks/useSettings';

export const getFormattedDate = (tempDate: Date, language: string) => {
  const momentDate = moment(tempDate, 'MM/DD/YYYY');
  if (language === LANGUAGES.THAI) momentDate.add(543, 'years');
  return momentDate.format('MM/DD/YYYY');
};
