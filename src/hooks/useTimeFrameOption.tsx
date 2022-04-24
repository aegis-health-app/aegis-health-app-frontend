import { useTranslation } from 'react-i18next';

export const useTimeFrameOption = () => {
  const { t } = useTranslation();
  const timeFrameOption = [
    {
      label: t('analytics.week'),
      value: 'week'
    },
    {
      label: t('analytics.2week'),
      value: '2week'
    },
    {
      label: t('analytics.1month'),
      value: 'month'
    },
    {
      label: t('analytics.3month'),
      value: '3months'
    },
    {
      label: t('analytics.year'),
      value: 'year'
    },
    {
      label: t('analytics.allTime'),
      value: 'allTime'
    }
  ];
  return timeFrameOption;
};
