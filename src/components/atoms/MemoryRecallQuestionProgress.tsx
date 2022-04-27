import React from 'react';
import { Box, Button, Progress, Spacer, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import { client } from '../../config/axiosConfig';

type MemoryRecallQuestionProgressProps = {
  questionNumber: number;
  totalQuestion: number;
  setQuestionNumber;
  answerArray: Answer[];
  setAnswerArray: (val: Answer[]) => void;
  mid: number;
};

const MemoryRecallQuestionProgress = (
  props: MemoryRecallQuestionProgressProps
) => {
  const {
    questionNumber,
    totalQuestion,
    setQuestionNumber,
    answerArray,
    setAnswerArray,
    mid
  } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSkip = () => {
    setQuestionNumber(questionNumber);
    const answer = { mid: mid, answer: 'skipped' };
    setAnswerArray((arr) => [...arr, answer]);
    if (questionNumber === totalQuestion) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    //TODO: Implement handle submit for skip button
    console.log('call handle submit from skip');
    const payload = { answer: answerArray };
    try {
      client.post('/memoryRractice/elderlyAnswers', payload);
      console.log('answer submitted');
    } catch (err) {
      console.log(err);
    }
    navigation.navigate('MemoryScreen');
  };
  const progress = (questionNumber / totalQuestion) * 100;
  return (
    <View paddingX={'16 px'} paddingTop={'16 px'}>
      <View style={styles.progressBar}>
        <View w={'80%'} mr={'12 px'}>
          <Text fontSize={'md'} fontWeight={'bold'}>
            Question {questionNumber} of {totalQuestion}
          </Text>
          <Spacer height={2} />
          <Box w="100%" maxW="400">
            <Progress value={progress} />
          </Box>
        </View>
        <View>
          <Button
            size="lg"
            colorScheme="primary"
            variant="outline"
            onPress={() => handleSkip()}>
            Skip
          </Button>
        </View>
      </View>
    </View>
  );
};

export default MemoryRecallQuestionProgress;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row'
  }
});
