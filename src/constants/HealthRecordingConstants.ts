export enum TimeFrame {
  WEEK = 'week',
  TWO_WEEKS = '2week',
  MONTH = 'month',
  THREE_MONTHS = '3months',
  YEAR = 'year',
  ALL_TIME = 'allTime'
}

export const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(29, 132, 223, ${opacity})`,
  strokeWidth: 2.5,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};
