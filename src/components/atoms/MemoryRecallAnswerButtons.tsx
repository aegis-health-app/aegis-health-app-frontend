import { Button, HStack, View, VStack, useToast, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import { client } from '../../config/axiosConfig';
import { useTranslation } from 'react-i18next';

type Props = {
  questionNumber: number;
  answer: Answer;
  setAnswer: (val: Answer) => void;
  questionType: string;
  showAnswer: boolean;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
  setShowBg: (val: boolean) => void;
  setShortAnswer: (val: string) => void;
  answerArray: Answer[];
  setAnswerArray: React.Dispatch<React.SetStateAction<Answer[]>>;
  mid: number;
};

const MemoryRecallAnswerButtons = (props: Props) => {
  const {
    questionNumber,
    answer,
    setAnswer,
    showAnswer,
    setQuestionNumber,
    totalQuestion,
    setShowBg,
    setShortAnswer,
    mid,
    answerArray,
    setAnswerArray
  } = props;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [shouldShowAnswer, setShouldShowAnswer] = useState<boolean>(showAnswer);

  /**This function is call when the user pressthe exit button. Submit all answer to backend */
  const exitGame = () => {
    handleSubmit();
  };
  const canNotGoBack = questionNumber === 0;
  /**
   * This function submit all the answer to backend
   */
  const handleSubmit = async () => {
    const payload = { answers: answerArray };
    console.log('payload is: ', payload);
    try {
      await client.post('/memoryPractice/elderlyAnswers', payload);
      navigation.navigate('MemoryRecallFinishScreen');
    } catch (err) {
      console.log(err);
      toast.show({
        title: t('memoryRecallElderly.failToSubmit')
      });
      navigation.navigate('MemoryRecallFinishScreen');
    }
  };
  /**
   * The function handle when user check their choice question and show whether it is correct.
   */
  const toast = useToast();
  const handleCheck = () => {
    if (answer.answer === 'null') {
      toast.show({
        title: t('memoryRecallElderly.pleaseSelectAChoice')
      });
      return;
    }
    setShowBg(true);
    setShouldShowAnswer(false);
  };
  /**
   * This function show the next question.
   */
  const goNextQuestion = () => {
    const answerTmp = answerArray;
    answerTmp.push(answer);
    setAnswerArray(answerTmp);
    setShortAnswer('');
    setAnswer({ mid: mid, answer: 'null' });
    // console.log('answer is: ', answer);
    if (questionNumber + 1 === totalQuestion) {
      handleSubmit();
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };

  return (
    <View style={styles.buttonGroup}>
      <VStack space={4}>
        <HStack space={4} marginTop={4} justifyContent={'flex-start'}>
          <Button
            w={'170 px'}
            backgroundColor={!canNotGoBack ? null : 'muted.300'}
            disabled={canNotGoBack}
            colorScheme="primary"
            variant={!canNotGoBack ? 'outline' : 'solid'}
            onPress={() => setQuestionNumber(questionNumber - 1)}>
            {t('memoryRecallElderly.back')}
          </Button>
          {shouldShowAnswer ? (
            <Button w={'170 px'} variant="solid" onPress={handleCheck}>
              {t('memoryRecallElderly.check')}
            </Button>
          ) : (
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={goNextQuestion}>
              {t('memoryRecallElderly.next')}
            </Button>
          )}
        </HStack>
        <Button
          w="100%"
          colorScheme="secondary"
          variant="outline"
          onPress={() => exitGame()}>
          {t('memoryRecallElderly.exitGame')}
        </Button>
      </VStack>
    </View>
  );
};

export default MemoryRecallAnswerButtons;

const styles = StyleSheet.create({
  buttonGroup: {
    justifyContent: 'flex-end'
  }
});
