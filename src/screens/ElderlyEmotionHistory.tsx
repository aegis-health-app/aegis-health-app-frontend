import { View, useToast, ScrollView, Spinner } from 'native-base';
import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit';
import EmotionalTable from '../components/molecules/EmotionalTable';
import { EmotionHistory } from '../dto/modules/emotionTracking.dto';
import {
  EmotionalHistoryFrequency,
  useEmotionTracker
} from '../hooks/useEmotionTracker';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const ElderlyEmotionHistoryScreen = ({
  route
}: NativeStackScreenProps<
  RootStackParamList,
  'ElderlyEmotionHistoryScreen'
>) => {
  const { uid } = route.params;
  const {
    getEmotionAsHeatmapFrequency,
    getEmotionHistory,
    getEmotionFromHeatmapFrequency
  } = useEmotionTracker();

  const { width, height } = useWindowDimensions();
  const [hist, setHist] = useState<EmotionHistory[]>([]);
  const [histCount, setHistCount] = useState(0);

  const toast = useToast();
  function handleDayPress(val: EmotionalHistoryFrequency) {
    const message = getEmotionFromHeatmapFrequency(val.date, val.count);
    toast.show({ title: message });
  }

  useAsyncEffect(async () => {
    const data = await getEmotionHistory(uid);
    if (data.count && data.records) {
      setHist(data.records);
      setHistCount(data.count);
    }
  }, [uid]);

  const CONFIG = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(29, 132, 223, ${opacity})`
  };

  return (
    <ScrollView>
      <View mb={2} alignItems="center">
        {histCount > 0 ? (
          <View>
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
            <EmotionalTable data={hist} histCount={histCount} />
          </View>
        ) : (
          <View height="96" justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ElderlyEmotionHistoryScreen;
