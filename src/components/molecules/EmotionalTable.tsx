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
  const [currIndex, setCurrIndex] = useState(1);
  const [histLength, setHistLength] = useState(0);
  const [maxPageIndex, setMaxPageIndex] = useState(1);

  useEffect(() => {
    setHistLength(data.length);
    setMaxPageIndex(Math.ceil(data.length / 7));
  }, []);

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
          {data.map((val, key) => {
            return (
              <EmotionalHistoryItem
                key={key}
                date={val.date}
                emotion={val.emotion}
              />
            );
          })}
          <EmotionalTableNavigator
            currIndex={currIndex}
            setCurrIndex={setCurrIndex}
            maxIndex={maxPageIndex}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmotionalTable;
