import React from 'react';
import { Box, Button, Progress, Spacer, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type MemoryRecallQuestionProgressProps = {
  questionNumber: number;
  totalQuestion: number;
  setQuestionNumber;
};

const MemoryRecallQuestionProgress = (
  props: MemoryRecallQuestionProgressProps
) => {
  const { questionNumber, totalQuestion, setQuestionNumber } = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSkip = () => {
    setQuestionNumber(questionNumber);
    if (questionNumber === totalQuestion) {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    console.log('call handle submit');
    navigation.navigate('MemoryScreen');
  };
  const progress = (questionNumber / totalQuestion) * 100;
  console.log(progress);
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
