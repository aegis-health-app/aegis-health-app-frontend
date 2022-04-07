import React, { useState, useEffect } from 'react';
import { View, HStack, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { EmotionHistory } from '../../dto/modules/emotionTracking.dto';
import EmotionalTableNavigator from './EmotionalTableNavigator';
import EmotionalHistoryItem from './../atoms/EmotionalHistoryItem';

type EmotionalTableProps = {
  data: EmotionHistory[];
  histCount: number;
};

const EmotionalTable = ({ data, histCount }: EmotionalTableProps) => {
  const { height, width } = useWindowDimensions();

  const [hist, setHist] = useState<EmotionHistory[]>([]);
  const [currPageIndex, setCurrPageIndex] = useState(0);
  const [maxPageIndex, setMaxPageIndex] = useState(0);

  const NUM_ROWS = 7;

  useEffect(() => {
    setMaxPageIndex(Math.ceil(histCount / NUM_ROWS));
  }, [data, histCount]);

  // Display emotional history by page index
  useEffect(() => {
    if (currPageIndex === 0) {
      // page 1
      setHist(data.slice(0, 7));
    } else if (currPageIndex === maxPageIndex) {
      // last page
      setHist(data.slice(currPageIndex * 7, histCount));
    } else {
      setHist(data.slice(currPageIndex * 7, (currPageIndex + 1) * 7));
    }
  }, [currPageIndex]);

  return (
    <View w="full">
      <HStack w={width} justifyContent="space-around">
        <View w={width / 2} alignItems="center">
          <Text fontSize="lg" fontWeight="600">
            Date
          </Text>
        </View>
        <View w={width / 2} alignItems="center">
          <Text fontSize="lg" fontWeight="600">
            Emotion
          </Text>
        </View>
      </HStack>
      <View height={height / 2}>
        {/* Note: only show 7 items in a page */}
        {hist.map((val, key) => {
          return (
            <EmotionalHistoryItem
              key={key}
              date={val.date}
              emotionalLevel={val.emotionalLevel}
            />
          );
        })}
      </View>
      <EmotionalTableNavigator
        currPageIndex={currPageIndex}
        setCurrPageIndex={setCurrPageIndex}
        maxPageIndex={maxPageIndex}
      />
    </View>
  );
};

export default EmotionalTable;
