import { Image, Radio, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { StyleSheet } from 'react-native';
import { getBackGroundColor } from '../../utils/elderly/memoryRecallElderly';

type Props = {
  questionNumber: number;
  mid: string;
  question: string;
  imageId: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctAnswer: string;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
};

const ChoiceMemoryRecallQuestion = (props: Props) => {
  const {
    questionNumber,
    mid,
    question,
    imageId,
    choice1,
    choice2,
    choice3,
    choice4,
    correctAnswer,
    setQuestionNumber,
    totalQuestion
  } = props;
  const [value, setValue] = useState('one');
  const [showChoice, setShowChoice] = useState(true);
  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    setShowChoice(false);
    setTimeout(() => {
      setShowChoice(true);
    }, 0);
  }, [questionNumber, showBg]);

  return (
    <View padding={'16 px'} display={'flex'} justifyContent={'space-between'}>
      {/* Image */}
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
        {/* Question and Answer */}
        <Spacer />
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {questionNumber + 1}. {question}
        </Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Select a choice:
        </Text>
        {console.log(choice1, choice2, choice3, choice4)}
        <View minHeight={'160 px'}>
          {showChoice && (
            <Radio.Group
              name="choices"
              value={value}
              alignItems={'flex-start'}
              justifyItems={'flex-start'}
              onChange={(nextValue) => {
                console.log('value: ', nextValue);
                setValue(nextValue);
                console.log('set value', nextValue);
              }}>
              <View
                w={'100 %'}
                backgroundColor={
                  showBg
                    ? getBackGroundColor(choice1, value, correctAnswer)
                    : null
                }
                alignItems={'flex-start'}
                marginY={'1'}
                pl={2}
                rounded={'lg'}>
                <Radio value={choice1} my="1">
                  {choice1}
                </Radio>
              </View>
              <View
                w={'100 %'}
                backgroundColor={
                  showBg
                    ? getBackGroundColor(choice2, value, correctAnswer)
                    : null
                }
                alignItems={'flex-start'}
                marginY={'1'}
                pl={2}
                rounded={'lg'}>
                <Radio value={choice2} my="1">
                  {choice2}
                </Radio>
              </View>
              <View
                w={'100 %'}
                backgroundColor={
                  showBg
                    ? getBackGroundColor(choice3, value, correctAnswer)
                    : null
                }
                alignItems={'flex-start'}
                marginY={'1'}
                pl={2}
                rounded={'lg'}>
                <Radio value={choice3} my="1">
                  {choice3}
                </Radio>
              </View>
              <View
                w={'100 %'}
                backgroundColor={
                  showBg
                    ? getBackGroundColor(choice4, value, correctAnswer)
                    : null
                }
                alignItems={'flex-start'}
                marginY={'1'}
                pl={2}
                rounded={'lg'}>
                <Radio value={choice4} my="1">
                  {choice4}
                </Radio>
              </View>
            </Radio.Group>
          )}
        </View>
      </View>
      {/* Buttons */}
      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={value}
        // shouldShowAnswer={true}
        questionType={'choice'}
        setQuestionNumber={setQuestionNumber}
        totalQuestion={totalQuestion}
        setShowBg={setShowBg}
      />
    </View>
  );
};

export default ChoiceMemoryRecallQuestion;
