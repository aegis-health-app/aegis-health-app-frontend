import { Image, Text, View } from 'native-base';
import React, { useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';

type Props = {
  questionNumber: number;
  mid: string;
  question: string;
  imageId: string;
  setQuestionNumber: (val: number) => void;
};

const ChoiceMemoryRecallQuestion = (props: Props) => {
  const { questionNumber, mid, question, imageId, setQuestionNumber } = props;
  const [showAnswer, setShowAnswer] = useState(false);

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
          {questionNumber}. {question}
        </Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Select a choice:
        </Text>
        <Text>choices 1</Text>
        <Text>choices 2</Text>
        <Text>choices 3</Text>
        <Text>choices 4</Text>
      </View>
      {/* Buttons */}
      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={'a'}
        showAnswer={showAnswer}
        setQuestionNumber={setQuestionNumber}
        setShowAnswer={setShowAnswer}
      />
    </View>
  );
};

export default ChoiceMemoryRecallQuestion;
