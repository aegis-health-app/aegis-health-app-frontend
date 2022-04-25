import { Image, Radio, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { MemoryRecallQuestion } from '../../dto/modules/memoryRecallElderly.dto';

type Props = {
  questionNumber: number;
  mid: string;
  question: string;
  imageId: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  questionDetail: MemoryRecallQuestion;
  correctAnswer: string;
  setQuestionNumber: (val: number) => void;
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
    questionDetail,
    correctAnswer,
    setQuestionNumber
  } = props;
  const [value, setValue] = useState('one');
  const [showChoice, setShowChoice] = useState(true);
  useEffect(() => {
    setShowChoice(false);
    setTimeout(() => {
      setShowChoice(true);
    }, 0);
  }, [questionNumber]);

  return (
    <View padding={'16 px'} display={'flex'} justifyContent={'space-between'}>
      {/* Image */}
      <View my={'24 px'}>
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
              onChange={(nextValue) => {
                console.log('value: ', nextValue);
                setValue(nextValue);
                console.log('set value', nextValue);
              }}>
              <Radio value={choice1} my="1">
                {questionDetail.multipleChoiceQuestion.choice1}
              </Radio>
              <Radio value={choice2} my="1">
                {choice2}
              </Radio>
              <Radio value={choice3} my="1">
                {choice3}
              </Radio>
              <Radio value={choice4} my="1">
                {choice4}
              </Radio>
            </Radio.Group>
          )}
        </View>
      </View>
      {/* Buttons */}
      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={value}
        shouldShowAnswer={true}
        setQuestionNumber={setQuestionNumber}
      />
    </View>
  );
};

export default ChoiceMemoryRecallQuestion;
