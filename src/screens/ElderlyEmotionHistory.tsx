import { View, Text } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import EmotionalTable from '../components/molecules/EmotionalTable';
import { EmotionalHistory } from './../dto/modules/emotionRecord';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { getNumberOfDaysBetweenMonth } from './../utils/caretaker/emotionHeatmap';

const ElderlyEmotionHistory = () => {
  const { width } = useWindowDimensions();
  const [hist, setHist] = useState<EmotionalHistory[]>([]);

  useEffect(() => {
    const data: EmotionalHistory[] = [
      { date: new Date(0), emotion: 'NEUTRAL' },
      { date: new Date(0), emotion: 'N/A' },
      { date: new Date(), emotion: 'HAPPY' },
      { date: new Date(), emotion: 'HAPPY' },
      { date: new Date(), emotion: 'BAD' },
      { date: new Date(0), emotion: 'NEUTRAL' },
      { date: new Date(100000000), emotion: 'NEUTRAL' }
    ];

    setHist(data);
  }, []);

  const CONFIG: ChartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <View flex={1}>
      <Text>Graph</Text>
      <View alignItems="center" justifyContent="center">
        {hist.length > 0 && (
          <ContributionGraph
            values={hist}
            endDate={new Date()}
            numDays={getNumberOfDaysBetweenMonth(1)}
            width={width}
            height={220}
            chartConfig={CONFIG}
          />
        )}
      </View>

      <EmotionalTable data={hist} />
    </View>
  );
};

export default ElderlyEmotionHistory;
