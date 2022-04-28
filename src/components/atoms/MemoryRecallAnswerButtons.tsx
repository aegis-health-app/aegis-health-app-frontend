import { Button, HStack, View, VStack, Text, useToast } from 'native-base';
import React, { useEffect, useState } from 'react';
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
  const [canCheck, setCanCheck] = useState<boolean>(answer.answer !== 'null');
  const [renderButton, setRenderButton] = useState<boolean>(true);
  useEffect(() => {
    console.log('setcan check');
    setRenderButton(false);
    setTimeout(() => {
      setRenderButton(true);
    }, 0);
    if (answer.answer !== 'null') {
      console.log('set can check');
      setCanCheck(true);
    }
  }, [answer]);
  /**This function is call when the user pressthe exit button. Submit all answer to backend */
  const exitGame = () => {
    console.log('call handle exit');
    handleSubmit();
  };
  const canNotGoBack = questionNumber === 0;
  /**
   * This function submit all the answer to backend
   */
  const handleSubmit = async () => {
    console.log('call handle submit');
    console.log('answer array before payload is: ', answerArray);
    const payload = { answers: answerArray };
    try {
      await client.post('/memoryPractice/elderlyAnswers', payload);
      navigation.navigate('MemoryRecallFinishScreen');
    } catch (err) {
      toast.show({
        title: t('memoryRecallElderly.failToSubmit')
      });
      console.log('error from sending payload');
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
    console.log('handle check');
    setShowBg(true);
    setShouldShowAnswer(false);
  };
  /**
   * This function show the next question.
   */
  const goNextQuestion = () => {
    //add data to answer array
    const answerTmp = answerArray;
    answerTmp.push(answer);
    setAnswerArray(answerTmp);
    //setAnswerArray((arr) => [...arr, answer]); //TODO: add answer for blank one
    // console.log('go next question');
    // console.log('answer to send is: ', answer);
    // console.log('answer array is: ', answerArray);
    setShortAnswer('');
    setAnswer({ mid: mid, answer: 'null' });
    // setQuestionNumber(questionNumber + 1);
    if (questionNumber + 1 === totalQuestion) {
      handleSubmit();
    } else {
      setQuestionNumber(questionNumber + 1);
    }
    console.log('answer array is: ', answerArray);
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
          {/* <Text>{JSON.stringify(answer.answer !== 'null')}</Text>
          <Text>{JSON.stringify(canCheck)}</Text>
          <Text>
            {JSON.stringify(
              answer.answer !== 'null' && canCheck ? 'primary' : 'muted.300'
            )}
          </Text> */}
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
