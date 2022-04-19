import {
  Box,
  Button,
  HStack,
  Image,
  Progress,
  Row,
  Text,
  View,
  VStack
} from 'native-base';
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
    <View justifyContent={'space-between'} height={'100%'} padding={'16 px'}>
      <View>
        <View style={styles.progressBar}>
          <View bgColor={'red.300'}>
            <Text fontSize={'md'} fontWeight={'bold'}>
              Question {questionNumber} of {questionNumber}
            </Text>

            <Box w="90%" maxW="400">
              <Progress value={45} mx="4" />
            </Box>
          </View>
          <View>
            <Button
              size="sm"
              colorScheme="primary"
              variant="outline"
              onPress={() => console.log('skip')}>
              Skip
            </Button>
          </View>
        </View>
        <View>
          <Image
            source={require('../../assets/images/tempMonday.png')}
            // fallbackSource={images.healthRecording}
            alt="temp image for memory recall question"
            width={'100%'}
            height={200}
            resizeMode="contain"
            mr={3}
          />
        </View>
        <View>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            1. question place holder
          </Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            Select a choice:
          </Text>
        </View>
        <View>
          <Text>choices 1</Text>
          <Text>choices 2</Text>
          <Text>choices 3</Text>
          <Text>choices 4</Text>
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <VStack space={4}>
          <HStack space={4} justifyContent="center" paddingX={12} marginTop={4}>
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="solid"
              onPress={() => console.log('skip')}>
              Back
            </Button>
            <Button
              w={'170 px'}
              colorScheme="primary"
              variant="outline"
              onPress={() => console.log('skip')}>
              Check
            </Button>
          </HStack>
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => console.log('exit')}>
            Exit game
          </Button>
        </VStack>
      </View>
    </View>
  );
};

export default ChoiceMemoryRecallQuestion;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonGroup: {
    justifyContent: 'flex-end'
  }
});
