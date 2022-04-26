import { Image, Input, Text, View } from 'native-base';
import React, { useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';

type Props = {
  questionNumber: number;
  mid: string;
  question: string;
  imageid: string;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
};

const ShortAnswerMemoryRecallQuestion = (props: Props) => {
  const {
    questionNumber,
    mid,
    question,
    imageid,
    setQuestionNumber,
    totalQuestion
  } = props;
  const [shortAnswer, setShortAnswer] = useState('');
  const [answer, setAnswer] = useState<Answer>({ mid: mid, answer: 'null' }); //TODO: check why mid not called
  const [showBg, setShowBg] = useState(false);
  const handleChange = (value: string) => {
    setShortAnswer(value);
    setAnswer({ mid: mid, answer: value });
  };
  console.log('The answer is: ', answer);

  return (
    <View padding={'16 px'}>
      <View>
        <Image
          source={{ uri: imageid }}
          // fallbackSource={images.healthRecording}
          alt="temp image for memory recall question"
          width={'100%'}
          height={200}
          resizeMode="contain"
          mr={3}
        />
      </View>
      <Spacer />
      <View>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {questionNumber + 1}. {question} mid is: {mid}
        </Text>
        <Spacer />
        <Text fontSize={'sm'} color={'gray.500'}>
          Type in your answer:
        </Text>
        <Input
          value={shortAnswer}
          onChangeText={handleChange}
          placeholder="Type in your answer"
        />
      </View>

      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={answer}
        questionType={'short answer'}
        showAnswer={false}
        setQuestionNumber={setQuestionNumber}
        totalQuestion={totalQuestion}
        setShowBg={setShowBg}
        setShortAnswer={setShortAnswer}
      />
    </View>
  );
};

export default ShortAnswerMemoryRecallQuestion;
