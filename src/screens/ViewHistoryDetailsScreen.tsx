import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../components/atoms/Divider';
import ViewHistoryDetailsCard from '../components/organisms/HistoryDetailsCard';
import { useSettings } from '../hooks/useSettings';
import { RootStackParamList } from '../navigation/types';
import { getFormattedDate } from '../utils/getFormattedDate';

interface HistoryCard {
  date: string | Date;
  time: string;
  score: string;
  questions: Question[];
}

interface Question {
  imageId: string | undefined;
  question: string;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  correct?: boolean;
  answer?: number | string;
  selectedAnswer?: number;
}
const ViewHistoryDetailsScreen = () => {
  const { t } = useTranslation();
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //get backend question pool
  const [history, setHistory] = useState<HistoryCard>({
    date: '1970-01-09T00:00:00.000Z',
    time: '17:52',
    score: '3/4',
    questions: [
      {
        imageId: 'https://storage.googleapis.com/aegis-user-profile/profile-35-8bea3a2b86e7b27f4fcaea795cf76f1d17748e39e4252baa1a3d90c5c3ac95b3.jpg',
        question: 'What did you eat this morning?',
        choice1: 'Burger',
        choice2: 'Steak',
        choice3: 'Krapao',
        choice4: 'All of the above',
        correct: true,
        answer: 2,
        selectedAnswer: 2
      },
      {
        imageId: undefined,
        question: 'What did you eat this afternoon?',
        choice1: 'Fries',
        choice2: 'Ice Cream',
        choice3: 'Dinner',
        choice4: 'All of the above',
        correct: false,
        answer: 1,
        selectedAnswer: 3
      },
      {
        imageId: undefined,
        question: 'What is your favourite subject?',
        answer: 'ICE Capstone',
      }
    ]
  });

  const handleScore = () => {
    const scoreSplit = history.score.split('/')
    if(parseInt(scoreSplit[0])/parseInt(scoreSplit[1]) < 0.5) return '#C2410C';
    return '#005DB4'
  }

  return (
    <ScrollView>
      <View pb={2} mx={4} width="100%">
        <View flexDir="row" mb="3">
          <View
            mt={4}
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            width="92%">
            <View flexDir="row" alignItems="center" justifyContent="space-between" width="41.5%">
              <Text fontWeight="bold" fontSize="17">
                {getFormattedDate(new Date(history.date), language)}
              </Text>
              <Text fontWeight="bold" fontSize="17">{history.time}</Text>
            </View>
            <View flexDir="row" alignItems="center" justifyContent="space-between" width="30%">
              <Text fontSize="14" color="#52525B">
                {t('viewHistory.totalScore')}
              </Text>
              <Text fontWeight="bold" fontSize="17" color={handleScore()}>{history.score}</Text>
            </View>
          </View>
        </View>
        <View width="93%">
          {history.questions.map((data, index: number) => (
            <View key={index}>
              <ViewHistoryDetailsCard
                index={index}
                question={data.question}
                imageId={data.imageId}
                choice1={data.choice1}
                choice2={data.choice2}
                choice3={data.choice3}
                choice4={data.choice4}
                correct={data.correct}
                answer={data.answer}
                selectedAnswer={data.selectedAnswer}
              />
              <Divider/>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewHistoryDetailsScreen;
