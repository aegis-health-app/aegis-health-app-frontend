import i18n from '../internationalization/i18n.config';

export enum TimeFrame {
  WEEK = 'week',
  TWO_WEEKS = '2week',
  MONTH = 'month',
  THREE_MONTHS = '3months',
  YEAR = 'year',
  ALL_TIME = 'allTime'
}

export const timeFrameOption = [
  {
    label: i18n.t('analytics.week'),
    value: 'week'
  },
  {
    label: i18n.t('analytics.2week'),
    value: '2week'
  },
  {
    label: i18n.t('analytics.1month'),
    value: 'month'
  },
  {
    label: i18n.t('analytics.3month'),
    value: '3months'
  },
  {
    label: i18n.t('analytics.year'),
    value: 'year'
  },
  {
    label: i18n.t('analytics.allTime'),
    value: 'allTime'
  }
];

export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(29, 132, 223, ${opacity})`,
  strokeWidth: 2.5,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};
