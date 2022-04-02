import { View } from 'native-base';
import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import EmotionalTable from '../components/molecules/EmotionalTable';
import { EmotionalHistory } from './../dto/modules/emotionRecord';
import {
  getEmotionAsHeatmapFrequency,
  getNumberOfDaysBetweenMonth
} from './../utils/caretaker/emotionHeatmap';
import moment from 'moment';

const ElderlyEmotionHistory = () => {
  const { width, height } = useWindowDimensions();
  const [hist, setHist] = useState<EmotionalHistory[]>([]);

  useEffect(() => {
    const data: EmotionalHistory[] = [
      { date: moment().subtract(50, 'days').toDate(), emotion: 'NEUTRAL' },
      { date: moment().subtract(14, 'days').toDate(), emotion: 'NA' },
      { date: moment().subtract(3, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(20, 'days').toDate(), emotion: 'HAPPY' },
      { date: moment().subtract(10, 'days').toDate(), emotion: 'BAD' },
      { date: moment().subtract(40, 'days').toDate(), emotion: 'NEUTRAL' },
      { date: moment().subtract(80, 'days').toDate(), emotion: 'NEUTRAL' }
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
    <View flex={1}>
      <View alignItems="center" justifyContent="center">
        <View w="96" bgColor="#fff" rounded="lg" alignItems="center" my={4}>
          {hist.length > 0 && (
            <ContributionGraph
              values={getEmotionAsHeatmapFrequency(hist)}
              endDate={new Date()}
              numDays={getNumberOfDaysBetweenMonth(3)}
              width={width}
              height={height / 3}
              chartConfig={CONFIG}
              squareSize={24}
              gutterSize={4}
              showOutOfRangeDays={true}
              onDayPress={(val) => {
                console.log(val);
              }}
            />
          )}
        </View>
      </View>

      <EmotionalTable data={hist} />
    </View>
  );
};

export default ElderlyEmotionHistory;
