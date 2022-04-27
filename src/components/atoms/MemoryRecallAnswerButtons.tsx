import { Button, HStack, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import { client } from '../../config/axiosConfig';

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //TODO: create at question page instead
  // const [answerArray, setAnswerArray] = useState<Answer[]>([]);
  const [shouldShowAnswer, setShouldShowAnswer] = useState<boolean>(showAnswer);

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
    console.log('payload is: ');
    console.log(payload);
    await client.post('/memoryPractice/elderlyAnswers', payload);
    console.log('answer submitted');

    navigation.navigate('MemoryRecallFinishScreen');
  };
  /**
   * The function handle when user check their choice question and show whether it is correct.
   */
  const handleCheck = () => {
    console.log('handle check');
    setShowBg(true);
    setShouldShowAnswer(false);
  };
  /**
   * This function show the next question.
   */
  const goNextQuestion = () => {
    //add data to answer array
    // const answerTmp = answerArray;
    // answerTmp.push(answer);
    // setAnswerArray(answerTmp);
    setAnswerArray((arr) => [...arr, answer]); //TODO: add answer for blank one
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
    console.log('answer array90 is: ', answerArray);
  };

  return (
    <View style={styles.buttonGroup}>
      <VStack space={4}>
        <HStack space={4} marginTop={4} justifyContent={'flex-start'}>
          <Button
            w={'170 px'}
            backgroundColor={!canNotGoBack ? null : 'muted.300'} //find the correct color for white
            disabled={canNotGoBack}
            colorScheme="primary"
            variant={!canNotGoBack ? 'outline' : 'solid'}
            onPress={() => setQuestionNumber(questionNumber - 1)}>
            Back
          </Button>
          {shouldShowAnswer ? (
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={() => handleCheck()}>
              Check
            </Button>
          ) : (
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={() => goNextQuestion()}>
              Next
            </Button>
          )}
        </HStack>
        <Button
          w="100%"
          colorScheme="secondary"
          variant="outline"
          onPress={() => exitGame()}>
          Exit game
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
