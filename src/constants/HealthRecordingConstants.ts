export const timeFrameOption = [
  {
    label: 'Week',
    value: 'WEEK'
  },
  {
    label: '2 Weeks',
    value: '2 WEEKS'
  },
  {
    label: '1 Month',
    value: '1 MONTHS'
  },
  {
    label: '3 Months',
    value: '3 MONTHS'
  },
  {
    label: 'Year',
    value: 'YEAR'
  },
  {
    label: 'All Time',
    value: 'ALL TIME'
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
