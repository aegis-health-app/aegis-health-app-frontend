import { Image, Radio, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';
import { getBackGroundColor } from '../../utils/elderly/memoryRecallElderly';
import { Answer } from '../../dto/modules/memoryRecallElderly.dto';
import images from '../../assets/images';

type Props = {
  questionNumber: number;
  mid: number;
  question: string;
  imageid: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctAnswer: string;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
  answerArray: Answer[];
  setAnswerArray: (val: Answer[]) => void;
};

const ChoiceMemoryRecallQuestion = (props: Props) => {
  const {
    questionNumber,
    mid,
    question,
    imageid,
    choice1,
    choice2,
    choice3,
    choice4,
    correctAnswer,
    setQuestionNumber,
    totalQuestion,
    answerArray,
    setAnswerArray
  } = props;
  const [value, setValue] = useState('one');
  const [showChoice, setShowChoice] = useState(true);
  const [showBg, setShowBg] = useState(false);
  const [answer, setAnswer] = useState<Answer>({ mid: mid, answer: 'null' });
  const [shortAnswer, setShortAnswer] = useState('');
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
          source={{ uri: imageid }}
          fallbackSource={images.healthRecording}
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
                setAnswer({ mid: mid, answer: value });
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
        answer={answer}
        setAnswer={setAnswer}
        questionType={'choice'}
        showAnswer={true}
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

export default ChoiceMemoryRecallQuestion;
