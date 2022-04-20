import { Button, HStack, View, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Text } from 'react-native-svg';

type Props = {
  questionNumber: number;
  answer: string;
  showAnswer: boolean;
  setQuestionNumber: (val: number) => void;
  setShowAnswer: (val: boolean) => void;
};

const MemoryRecallAnswerButtons = (props: Props) => {
  const {
    questionNumber,
    answer,
    showAnswer,
    setQuestionNumber,
    setShowAnswer
  } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  /**This function is call when the user pressthe exit button. Submit all answer to backend */
  const exitGame = () => {
    handleSubmit();
    navigation.navigate('MemoryScreen');
  };
  const canNotGoBack = questionNumber === 1;
  /**
   * This function submit all the answer to backend
   */
  const handleSubmit = () => {
    console.log('call handle submit');
  };
  /**
   * The function handle when user check their choice question and show whether it is correct.
   */
  const handleCheck = () => {
    console.log('handle check');
    setShowAnswer(true);
  };
  /**
   * This function show the next question.
   */
  const goNextQuestion = () => {
    console.log('go next question');
    setQuestionNumber(questionNumber + 1);
    //if it is the last question, call handle submit.
    // handleSubmit();
  };
  console.log({ questionNumber });
  console.log({ canNotGoBack });
  return (
    <View style={styles.buttonGroup}>
      <VStack space={4}>
        <HStack space={4} marginTop={4} justifyContent={'flex-start'}>
          <Button
            w={'170 px'}
            backgroundColor={!canNotGoBack ? 'grey.100' : 'muted.300'}
            disabled={canNotGoBack}
            colorScheme="primary"
            variant={!canNotGoBack ? 'outline' : 'solid'}
            onPress={() => navigation.goBack()}>
            Back
          </Button>
          {showAnswer ? (
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={() => goNextQuestion()}>
              Next
            </Button>
          ) : (
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={() => handleCheck()}>
              Check
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
