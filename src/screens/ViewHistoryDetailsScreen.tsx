import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../components/atoms/Divider';
import ViewHistoryDetailsCard from '../components/organisms/HistoryDetailsCard';
import { useSettings } from '../hooks/useSettings';
import { RootStackParamList } from '../navigation/types';
import {
  getFormattedDate,
  getFormattedDateTime
} from '../utils/getFormattedDate';

interface HistoryCard {
  timestamp: string | Date;
  questions: Question[];
}

interface Question {
  imageUrl: string | undefined;
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
const ViewHistoryDetailsScreen = () => {
  const { t } = useTranslation();
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //get backend question pool
  const [history, setHistory] = useState<HistoryCard>({
    timestamp: '2022-04-20T10:14:41.057Z',
    questions: [
      {
        imageUrl:
          'https://storage.googleapis.com/aegis-user-profile/profile-35-8bea3a2b86e7b27f4fcaea795cf76f1d17748e39e4252baa1a3d90c5c3ac95b3.jpg',
        mid: 0,
        isMultipleChoice: true,
        question: 'What did you eat this morning?',
        choice1: 'Burger',
        choice2: 'Steak',
        choice3: 'Krapao',
        choice4: 'All of the above',
        isCorrect: true,
        correctAnswer: 'Steak',
        elderlyAnswer: 'Steak'
      },
      {
        imageUrl: undefined,
        mid: 0,
        isMultipleChoice: true,
        question: 'What did you eat this afternoon?',
        choice1: 'Fries',
        choice2: 'Ice Cream',
        choice3: 'Dinner',
        choice4: 'All of the above',
        isCorrect: false,
        correctAnswer: 'Fries',
        elderlyAnswer: 'Dinner'
      },
      {
        imageUrl: undefined,
        mid: 0,
        isMultipleChoice: false,
        question: 'What is your favourite subject?',
        elderlyAnswer: 'ICE Capstone'
      }
    ]
  });

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
                {getFormattedDateTime(new Date(history.timestamp), language)}
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
                imageId={data.imageUrl}
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
