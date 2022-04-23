import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../components/atoms/Divider';
import ViewHistoryDetailsCard from '../components/organisms/HistoryDetailsCard';
import { CaretakerContext } from '../contexts/CaretakerContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { useSettings } from '../hooks/useSettings';
import { RootStackParamList } from '../navigation/types';
import { getFormattedDateTime } from '../utils/getFormattedDate';
import { getHistoryDetails } from '../utils/module/history';

export interface HistoryDetailsCard {
  timestamp: string | Date;
  questions: Question[];
}

export interface Question {
  imageUrl: string | undefined | null;
  mid: number;
  question: string;
  isMultipleChoice: boolean;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  isCorrect?: boolean;
  correctAnswer?: string;
  elderlyAnswer?: string;
}
const ViewHistoryDetailsScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'ViewHistoryDetailsScreen'>) => {
  const { timestamp } = route.params;
  const { t } = useTranslation();
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();

  //get backend question pool
  const [history, setHistory] = useState<HistoryDetailsCard>({
    timestamp: timestamp,
    questions: []
  });

  const { currentElderlyUid } = useContext(CaretakerContext);
  useAsyncEffect(async () => {
    const data = await getHistoryDetails(
      currentElderlyUid as number,
      timestamp
    );
    setHistory(data);
  }, [isFocused]);

  const handleDateFormat = (date: string | Date) => {
    const temp = date.toString().split(' ');
    return `${temp[0]}T${temp[1].substring(0, 11)}Z`;
  };

  return (
    <ScrollView>
      <View pb={2} mx={4} width="100%">
        <View flexDir="row" mb="3">
          <View mt={4} flexDir="row" alignItems="center" width="92%">
            <View
              flexDir="row"
              alignItems="center"
              justifyContent="space-between">
              <Text fontWeight="bold" fontSize="17">
                {getFormattedDateTime(
                  new Date(handleDateFormat(history.timestamp)),
                  language
                )}
              </Text>
            </View>
          </View>
        </View>
        <View width="93%">
          {history.questions.map((data, index: number) => (
            <View key={index}>
              <ViewHistoryDetailsCard
                index={index}
                question={data.question}
                imageId={data.imageUrl ? data.imageUrl : undefined}
                choice1={data.choice1}
                choice2={data.choice2}
                choice3={data.choice3}
                choice4={data.choice4}
                isCorrect={data.isCorrect}
                correctAnswer={data.correctAnswer}
                elderlyAnswer={data.elderlyAnswer}
              />
              <Divider />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewHistoryDetailsScreen;
