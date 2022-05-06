import moment from 'moment';
import React from 'react';
import { translateDate } from '../../constants/DateTranslations';
import { useSettings } from '../../hooks/useSettings';
import { Reminders } from '../../interfaces/reminders';
import ReminderDayHeader from '../atoms/ReminderDayHeader';
import ReminderItem from './ReminderItem';

interface Props {
  data: Reminders[];
  isOverdue?: boolean;
  isFinished?: boolean;
}

const ReminderGroup = ({ data, isOverdue, isFinished }: Props) => {
  const { language } = useSettings();
  const dateFormat = 'dddd, DD MMMM';
  return data?.map((item: Reminders) => {
    if (item.reminder.length !== 0)
      return (
        <>
          <ReminderDayHeader
            day={
              language === 'th'
                ? translateDate(moment(item.date).format(dateFormat))
                : moment(item.date).format(dateFormat)
            }
          />
          {item.reminder.map((reminder, index) => (
            <ReminderItem
              key={index}
              data={reminder}
              isOverdue={isOverdue}
              isFinished={isFinished}
              lastIndex={index === item.reminder.length - 1}
            />
          ))}
        </>
      );
  });
};

export default ReminderGroup;
