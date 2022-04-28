import { RecurringInterval } from "../dto/modules/reminder.dto";

export const ReminderRepeatitionPattern = [
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