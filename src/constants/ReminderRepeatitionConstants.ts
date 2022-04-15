import i18n from '../internationalization/i18n.config';

export const ReminderRepeatitionPattern = [
  {
    label: i18n.t('reminderRepeatitionPattern.doesNotRepeat'),
    value: 'doesNotRepeat'
  },
  {
    label: i18n.t('reminderRepeatitionPattern.everyday'),
    value: 'everyday'
  },
  {
    label: i18n.t('reminderRepeatitionPattern.everyweek'),
    value: 'everyweek'
  },
  {
    label: i18n.t('reminderRepeatitionPattern.everymonth'),
    value: 'everymonth'
  },
  {
    label: i18n.t('reminderRepeatitionPattern.everyyear'),
    value: 'everyyear'
  },
  {
    label: i18n.t('reminderRepeatitionPattern.custom'),
    value: 'custom'
  }
];