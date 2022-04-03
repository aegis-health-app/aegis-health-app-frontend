import React, { useState, useEffect } from 'react';
import { View, HStack, Text, ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { EmotionalHistory } from './../../dto/modules/emotionRecord';
import EmotionalTableNavigator from './EmotionalTableNavigator';
import EmotionalHistoryItem from './../atoms/EmotionalHistoryItem';
import { SafeAreaView } from 'react-native-safe-area-context';

type EmotionalTableProps = {
  data: EmotionalHistory[];
};

const EmotionalTable = ({ data }: EmotionalTableProps) => {
  const { height, width } = useWindowDimensions();

  const [hist, setHist] = useState<EmotionalHistory[]>([]);

  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(7);

  const [currPageIndex, setCurrPageIndex] = useState(1);
  const [maxPageIndex, setMaxPageIndex] = useState(1);

  useEffect(() => {
    setHist(data.slice(from, to));
    setMaxPageIndex(Math.ceil(data.length / 7));
  }, [data]);

  useEffect(() => {
    if (from > 1) {
      setFrom(from * currPageIndex);
    }
    setTo(from + 7);
    setHist(data.slice(from, to));
    console.log({ hist });
  }, [currPageIndex]);

  useEffect(() => {
    console.log(`Page ${currPageIndex}/${maxPageIndex}`);

    console.log({ to });
  }, [currPageIndex]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <ScrollView>
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
          {hist.map((val, key) => {
            return (
              <EmotionalHistoryItem
                key={key}
                date={val.date}
                emotion={val.emotion}
              />
            );
          })}
          <EmotionalTableNavigator
            currPageIndex={currPageIndex}
            setCurrPageIndex={setCurrPageIndex}
            maxPageIndex={maxPageIndex}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmotionalTable;
