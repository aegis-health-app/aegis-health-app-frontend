import { View, Text } from 'native-base';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { ContributionGraph } from 'react-native-chart-kit';
import EmotionalTable from '../components/molecules/EmotionalTable';

const ElderlyEmotionHistory = () => {
  const { width } = useWindowDimensions();

  return (
    <View flex={1}>
      <Text>Graph</Text>
      <CalendarHeatmap
        endDate={new Date('2016-04-01')}
        numDays={100}
        values={[
          { date: '2016-01-01' },
          { date: '2016-01-22' },
          { date: '2016-01-30' }
        ]}
      />
      <EmotionalTable />
    </View>
  );
};

export default ElderlyEmotionHistory;
