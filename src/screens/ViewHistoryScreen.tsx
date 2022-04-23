import { useIsFocused } from '@react-navigation/native';
import { ScrollView, Text, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewHistoryCard from '../components/organisms/HistoryCard';
import { CaretakerContext } from '../contexts/CaretakerContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getHistory } from '../utils/module/history';

export interface HistoryCard {
  timestamps: string[];
}

const ViewHistoryScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  //get backend question pool
  const [historyList, setHistoryList] = useState<HistoryCard>({
    timestamps: []
  });

  const { currentElderlyUid } = useContext(CaretakerContext);

  useAsyncEffect(async () => {
    const data = await getHistory(currentElderlyUid as number);
    setHistoryList(data);
  }, [isFocused]);

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
          {historyList.timestamps.map((data, index: number) => (
            <View key={index}>
              <ViewHistoryCard date={data} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewHistoryScreen;
