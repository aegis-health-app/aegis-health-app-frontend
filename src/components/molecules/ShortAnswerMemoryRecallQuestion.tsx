import { Image, Input, Text, View } from 'native-base';
import React, { useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import images from '../../assets/images';
import { useTranslation } from 'react-i18next';

type Props = {
  questionNumber: number;
  mid: number;
  question: string;
  imageid: string;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
  answerArray: Answer[];
  setAnswerArray: React.Dispatch<React.SetStateAction<Answer[]>>;
};

const ShortAnswerMemoryRecallQuestion = (props: Props) => {
  const {
    questionNumber,
    mid,
    question,
    imageid,
    setQuestionNumber,
    totalQuestion,
    answerArray,
    setAnswerArray
  } = props;
  const { t } = useTranslation();
  const [shortAnswer, setShortAnswer] = useState('');
  const [answer, setAnswer] = useState<Answer>({ mid: mid, answer: 'null' });
  const [showBg, setShowBg] = useState(false);
  const handleChange = (value: string) => {
    setShortAnswer(value);
    setAnswer({ mid: mid, answer: value });
  };
  // console.log('The answer is: ', answer);

  return (
    <View padding={'16 px'}>
      <View>
        {/* TODO: check whether there is an image id or not */}
        <Image
          source={{ uri: imageid }}
          fallbackSource={images.healthRecording}
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
          {t('memoryRecallElderly.typeInYourAnswer')}
        </Text>
        <Input
          value={shortAnswer}
          onChangeText={handleChange}
          placeholder={t('memoryRecallElderly.answer')}
        />
      </View>

      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={answer}
        setAnswer={setAnswer}
        questionType={'short answer'}
        showAnswer={false}
        setQuestionNumber={setQuestionNumber}
        totalQuestion={totalQuestion}
        setShowBg={setShowBg}
        setShortAnswer={setShortAnswer}
        answerArray={answerArray}
        setAnswerArray={setAnswerArray}
        mid={mid}
      />
    </View>
  );
};

export default ShortAnswerMemoryRecallQuestion;
