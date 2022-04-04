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
          <View maxH="80">
            {data.map((val, key) => {
              return (
                <EmotionalHistoryItem
                  key={key}
                  date={val.date}
                  emotion={val.emotion}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmotionalTable;
