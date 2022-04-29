import { RecurringInterval } from '../dto/modules/reminder.dto';

export const ReminderRepetitionPattern = [
  {
    label: 'doesNotRepeat',
    value: RecurringInterval.DOES_NOT_REPEAT
  },
  {
    label: 'everyday',
    value: RecurringInterval.EVERY_DAY
  },
  {
    label: 'everyweek',
    value: RecurringInterval.EVERY_WEEK
  },
  {
    label: 'everymonth',
    value: RecurringInterval.EVERY_MONTH
  },
  {
    label: 'custom',
    value: RecurringInterval.CUSTOM
  }
];

export const ReminderInfoScreenRecursion = {
  EVERY_DAY: 'reminder.dayRecursion',
  EVERY_WEEK: 'reminder.weekRecursion',
  EVERY_MONTH: 'reminder.monthRecursion'
};
