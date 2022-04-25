import { Button, HStack, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = {
  questionNumber: number;
  answer: string;
  // shouldShowAnswer: boolean;
  questionType: string;
  showAnswer: boolean;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
  setShowBg: (val: boolean) => void;
};

const MemoryRecallAnswerButtons = (props: Props) => {
  const {
    questionNumber,
    answer,

    showAnswer,
    setQuestionNumber,
    totalQuestion,
    setShowBg
  } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  /**This function is call when the user pressthe exit button. Submit all answer to backend */
  const exitGame = () => {
    console.log('call handle exit');
    handleSubmit();
  };
  const canNotGoBack = questionNumber === 0;
  /**
   * This function submit all the answer to backend
   */
  const handleSubmit = () => {
    console.log('call handle submit');
    navigation.navigate('MemoryScreen');
  };
  /**
   * The function handle when user check their choice question and show whether it is correct.
   */
  const handleCheck = () => {
    console.log('handle check');
    // setShowAnswer(false);
    setShowBg(true);
  };
  /**
   * This function show the next question.
   */
  const goNextQuestion = () => {
    // console.log('go next question');
    console.log('answer to send is: ', answer);
    setQuestionNumber(questionNumber + 1);
    // setShowAnswer(true);
    if (questionNumber + 1 === totalQuestion) {
      handleSubmit();
    }
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
          {showAnswer ? (
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
