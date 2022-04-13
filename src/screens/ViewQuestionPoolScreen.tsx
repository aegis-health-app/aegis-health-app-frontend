import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewQuestionPoolCard from '../components/organisms/ViewQuestionPoolCard';
import { RootStackParamList } from '../navigation/types';

interface QuestionCard {
  question: string;
  isSelected: boolean;
}

const ViewQuestionPoolScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //get backend question pool
  const [questionPool, setQuestionPool] = useState<QuestionCard[]>([
    { question: 'What did you eat this morning?', isSelected: false },
    { question: 'What did you eat this afternoon?', isSelected: true },
    { question: 'What will you eat tonight?', isSelected: true },
  ]);

  const [totalSelected, setTotalSelected] = useState<number>(
    questionPool.filter((item) => item.isSelected == true).length
  );
  
  const totalChange = useCallback(() => {
    setTotalSelected(
      questionPool.filter((item) => item.isSelected == true).length
    );
  }, [questionPool]);

  //post to backend selected questions
  const handleSubmit = () => {
    console.log(questionPool.filter((item) => item.isSelected == true));
  };
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
              {t('viewQuestionPool.questions')}
            </Text>
            <Text mt={4} color="#52525B" fontSize="14">
              {t('viewQuestionPool.totalSelected')}
            </Text>
          </View>
          <Text mt={4} fontWeight="bold" fontSize="17" ml="4">
            {totalSelected}/10
          </Text>
        </View>
        <ScrollView>
          {questionPool.map((data, index: number) => (
            <View key={index}>
              <ViewQuestionPoolCard
                isFull={totalSelected >= 10 && !data.isSelected}
                question={data.question}
                isSelected={data.isSelected}
                onSelect={(val) => {
                  const temp = questionPool;
                  temp[index] = {
                    question: data.question,
                    isSelected: val
                  };
                  setQuestionPool(temp);
                  totalChange();
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        bottom="0"
        height="15%"
        width="100%"
        position="absolute"
        bgColor="white">
        <Button mx={4} mt={4} onPress={() => handleSubmit()}>
          {t('viewQuestionPool.create')}
        </Button>
      </View>
    </View>
  );
};

export default ViewQuestionPoolScreen;
