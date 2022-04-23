import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ViewQuestionPoolCard from '../components/organisms/ViewQuestionPoolCard';
import { client } from '../config/axiosConfig';
import { CaretakerContext } from '../contexts/CaretakerContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { RootStackParamList } from '../navigation/types';
import { getQuestions } from '../utils/module/question';

export interface QuestionCard {
  question: string;
  isSelected: boolean;
  uid: number;
  mid: string;
  imageid: string | null;
}

const ViewQuestionPoolScreen = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //get backend question pool
  const [questionPool, setQuestionPool] = useState<QuestionCard[]>([]);

  const { currentElderlyUid } = useContext(CaretakerContext);

  useAsyncEffect(async () => {
    const data = await getQuestions(currentElderlyUid as number);
    setQuestionPool(data['questions']);
  }, [isFocused]);

  const [totalSelected, setTotalSelected] = useState<number>(
    questionPool.filter((item) => item.isSelected == true).length
  );

  const totalChange = useCallback(() => {
    setTotalSelected(
      questionPool.filter((item) => item.isSelected == true).length
    );
  }, [questionPool]);

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
        <ScrollView mb={40}>
          {questionPool.map((data, index: number) => (
            <View key={index}>
              <ViewQuestionPoolCard
                isFull={totalSelected >= 10 && !data.isSelected}
                question={data.question}
                isSelected={data.isSelected}
                onSelect={async (val) => {
                  const temp = questionPool;
                  temp[index] = {
                    question: data.question,
                    isSelected: val,
                    uid: data.uid,
                    mid: data.mid,
                    imageid: data.imageid
                  };
                  setQuestionPool(temp);
                  totalChange();
                  try {
                    await client.put(`/memoryPractice/editSelection/${val}`, {
                      elderlyuid: data.uid,
                      mid: `${data.mid}`
                    });
                  } catch (err) {
                    throw Error('Cannot edit selection')
                  }
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
        <Button mx={4} mt={4} onPress={() => console.log('navigate to create question')}>
          {t('viewQuestionPool.create')}
        </Button>
      </View>
    </View>
  );
};

export default ViewQuestionPoolScreen;
