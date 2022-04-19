import { Box, Button, Image, Progress, Row, Text, View } from 'native-base';
import { flexbox } from 'native-base/lib/typescript/theme/styled-system';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { assets } from '../../../react-native.config';

type ChoiceMemoryRecallQuestionProps = {
  questionNumber: any;
};

const ChoiceMemoryRecallQuestion = (props: ChoiceMemoryRecallQuestionProps) => {
  const handleSkip = () => {
    console.log('skipped');
  };
  const { questionNumber } = props;
  return (
    <View padding={'16 px'}>
      <View style={styles.progressBar}>
        <Text fontWeight={'bold'}>
          Question {questionNumber} of {questionNumber}
        </Text>
        <Button
          h="full"
          size="sm"
          colorScheme="primary"
          variant="outline"
          onPress={() => console.log('skip')}>
          Skip
        </Button>
        <Box w="90%" maxW="400">
          <Progress value={45} mx="4" />
        </Box>
      </View>
      <View>
        <Image
          source={require('../../assets/images/tempMonday.png')}
          // fallbackSource={images.healthRecording}
          alt="temp image for memory recall question"
          width={'100%'}
          height={320}
          resizeMode="contain"
          mr={3}
        />
      </View>
    </View>
  );
};

export default ChoiceMemoryRecallQuestion;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    padding: 0
  }
});
