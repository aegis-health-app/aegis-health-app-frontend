import { View, useToast, ScrollView } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import EmotionalTable from '../components/molecules/EmotionalTable';
import { EmotionalHistory } from './../dto/modules/emotionRecord';
import {
  EmotionalHistoryFrequency,
  getEmotionAsHeatmapFrequency
} from './../utils/caretaker/emotionHeatmap';
import moment from 'moment';

const ElderlyEmotionHistory = () => {
  const { width, height } = useWindowDimensions();
  const [hist, setHist] = useState<EmotionalHistory[]>([]);

  const toast = useToast();
  function handleDayPress(val: EmotionalHistoryFrequency) {
    toast.show({ title: JSON.stringify(val) });
  }

  useEffect(() => {
    const data: EmotionalHistory[] = [
      { date: moment().subtract(20, 'days').toDate(), emotion: 'NEUTRAL' },
      { date: moment().subtract(19, 'days').toDate(), emotion: 'NA' },
      { date: moment().subtract(18, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(17, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(16, 'days').toDate(), emotion: 'BAD' },
      { date: moment().subtract(15, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(14, 'days').toDate(), emotion: 'NEUTRAL' },
      { date: moment().subtract(13, 'days').toDate(), emotion: 'BAD' },
      { date: moment().subtract(12, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(11, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(10, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(9, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(8, 'days').toDate(), emotion: 'HAPPY' }
    ];

    setHist(data);
  }, []);

  const CONFIG = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(29, 132, 223, ${opacity})`
  };

  return (
    <ScrollView>
      <View mb={4} alignItems="center">
        {hist.length > 0 && (
          <ContributionGraph
            values={getEmotionAsHeatmapFrequency(hist)}
            endDate={new Date()}
            numDays={76}
            width={width - 20}
            height={height / 3}
            chartConfig={CONFIG}
            squareSize={24}
            gutterSize={2}
            onDayPress={(val) => {
              handleDayPress(val);
            }}
          />
        )}
      </View>
      <EmotionalTable data={hist} />
    </ScrollView>
  );
};

export default ElderlyEmotionHistory;
