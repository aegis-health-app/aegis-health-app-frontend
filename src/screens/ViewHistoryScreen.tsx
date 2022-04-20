import { ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewHistoryCard from '../components/organisms/HistoryCard';

interface HistoryCard {
  timestamp: string | Date;
}

const ViewHistoryScreen = () => {
  const { t } = useTranslation();

  //get backend question pool
  const [historyList, setHistoryList] = useState<HistoryCard[]>([
    { timestamp: '2022-04-19 22:08:54.799000' },
    { timestamp: '2022-04-19 22:08:54.799000' },
    { timestamp: '2022-04-19 22:08:54.799000' }
  ]);

  const handleDateFormat = (date: string | Date) => {
    const temp = date.toString().split(' ');
    return `${temp[0]}T${temp[1].substring(0, 11)}Z`;
  };

  handleDateFormat(historyList[0].timestamp);

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
              <ViewHistoryCard date={handleDateFormat(data.timestamp)} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewHistoryScreen;
