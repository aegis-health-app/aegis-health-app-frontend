import React from 'react';
import { Box, Button, Progress, Spacer, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';

type MemoryRecallQuestionProgressProps = {
  questionNumber: any;
};

const MemoryRecallQuestionProgress = (
  props: MemoryRecallQuestionProgressProps
) => {
  const { questionNumber } = props;
  return (
    <View>
      <View style={styles.progressBar}>
        <View w={'80%'} mr={'12 px'}>
          <Text fontSize={'md'} fontWeight={'bold'}>
            Question {questionNumber} of {questionNumber}
          </Text>
          <Spacer height={1} />
          <Box w="100%" maxW="400">
            <Progress value={45} />
          </Box>
        </View>
        <View>
          <Button
            size="lg"
            colorScheme="primary"
            variant="outline"
            onPress={() => console.log('skip')}>
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
