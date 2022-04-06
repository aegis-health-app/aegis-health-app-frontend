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

const EmotionalTable = ({ data }: EmotionalTableProps) => {
  const { height, width } = useWindowDimensions();

  const [hist, setHist] = useState<EmotionHistory[]>([]);

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);

  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);

  const NUM_ROWS = 7;

  useEffect(() => {
    setHist(data.slice(0, NUM_ROWS));
    setMaxPageIndex(Math.ceil(data.length / NUM_ROWS));
    setTo(from + 7);
  }, [data]);

  //TODO: request data from back-end when currPageIndex changes
  useEffect(() => {
    setHist(data.slice(from, to));
  }, [currPageIndex]);

  return (
    <View flex={1} w="full" minH={height / 2}>
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
      {/* Note: only show 7 items in a page */}
      {data.map((val, key) => {
        return (
          <EmotionalHistoryItem
            key={key}
            date={val.date}
            emotionalLevel={val.emotionalLevel}
          />
        );
      })}
      <EmotionalTableNavigator
        currPageIndex={currPageIndex}
        setCurrPageIndex={setCurrPageIndex}
        maxPageIndex={maxPageIndex}
      />
    </View>
  );
};

export default EmotionalTable;
