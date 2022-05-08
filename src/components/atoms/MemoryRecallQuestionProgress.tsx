import React from 'react';
import {
  Box,
  Button,
  Progress,
  Spacer,
  Text,
  useToast,
  View
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import { client } from '../../config/axiosConfig';
import { useTranslation } from 'react-i18next';

type MemoryRecallQuestionProgressProps = {
  questionNumber: number;
  totalQuestion: number;
  setQuestionNumber;
  answerArray: Answer[];
  setAnswerArray: React.Dispatch<React.SetStateAction<Answer[]>>;
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
  const { t } = useTranslation();
  const toast = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  /**
   * handle when user press the skip button. Move to the next question
   */
  const handleSkip = () => {
    const answer = { mid: mid, answer: 'skipped' };
    setQuestionNumber(questionNumber);
    const answerTmp = answerArray;
    answerTmp.push(answer);
    setAnswerArray(answerTmp);
    if (questionNumber + 1 === totalQuestion) {
      handleSubmit();
    } else {
      setQuestionNumber(questionNumber + 1);
    }
  };
  const handleSubmit = async () => {
    const payload = { answer: answerArray };
    console.log('payload from skip is: ', payload);
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
  const questionProgress = questionNumber + 1;
  const progress = (questionProgress / totalQuestion) * 100;
  console.log('answer array is: ', answerArray);

  return (
    <View paddingX={'16 px'} paddingTop={'16 px'}>
      <View style={styles.progressBar}>
        <View w={'80%'} mr={'12 px'}>
          <Text fontSize={'md'} fontWeight={'bold'}>
            {t('memoryRecallElderly.question')} {questionNumber + 1}
            {t('memoryRecallElderly.of')} {totalQuestion}
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
            {t('memoryRecallElderly.skip')}
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
