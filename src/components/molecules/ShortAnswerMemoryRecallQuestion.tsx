import { Image, Input, Text, View } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

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
  // console.log('mid 33 is: ', mid);
  const [answer, setAnswer] = useState<Answer>({ mid: mid, answer: 'null' });
  const [showBg, setShowBg] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const handleChange = (value: string) => {
    setShortAnswer(value);
    setAnswer({ mid: mid, answer: value });
  };
  useEffect(() => {
    setAnswer({ mid: mid, answer: 'null' });
  }, [mid]);
  useFocusEffect(
    useCallback(() => {
      setShowImage(false);
      setTimeout(() => {
        setShowImage(true);
      }, 0);
    }, [imageid])
  );

  return (
    <View padding={'16 px'}>
      <View minHeight={'460 px'}>
        {showImage && (
          <View>
            <Image
              source={{ uri: imageid }}
              fallbackElement={undefined}
              alt=" "
              width={'100%'}
              height={200}
              resizeMode="contain"
              mr={3}
            />
          </View>
        )}
        <Spacer />
        <View>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {questionNumber + 1}. {question}
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
