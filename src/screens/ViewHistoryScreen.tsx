import { ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewHistoryCard from '../components/organisms/HistoryCard';

interface HistoryCard {
  date: string | Date;
  time: string;
  score: string;
}

const ViewHistoryScreen = () => {
  const { t } = useTranslation();

  //get backend question pool
  const [historyList, setHistoryList] = useState<HistoryCard[]>([
    { date: '1970-01-09T00:00:00.000Z', time: '17:52', score: '3/4' },
    { date: '1970-01-09T00:00:00.000Z', time: '17:52', score: '2/5' },
    { date: '1970-01-09T00:00:00.000Z', time: '17:52', score: '8/10' }
  ]);

  return (
    <View flex={1}>
      <View mx={4} width="100%">
        <View flexDir="row">
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            width="77.5%">
            <Text mt={4} fontWeight="bold" fontSize="17">
              {t('viewHistory.quizRecords')}
            </Text>
          </View>
        </View>
        <ScrollView>
          {historyList.map((data, index: number) => (
            <View key={index}>
              <ViewHistoryCard
                date={data.date}
                time={data.time}
                score={data.score}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewHistoryScreen;
