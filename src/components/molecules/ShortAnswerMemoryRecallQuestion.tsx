import { Image, Text, View } from 'native-base';
import React, { useState } from 'react';
import TextInput from '../atoms/TextInput';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import { changePasswordSchema } from '../../interfaces/Password';

import MemoryRecallAnswerButtons from '../atoms/MemoryRecallAnswerButtons';
import Spacer from '../atoms/Spacer';

type Props = {
  questionNumber: number;
  mid: string;
  question: string;
  imageId: string;
  setQuestionNumber: (val: number) => void;
  totalQuestion: number;
};

const ShortAnswerMemoryRecallQuestion = (props: Props) => {
  const {
    questionNumber,
    mid,
    question,
    imageId,
    setQuestionNumber,
    totalQuestion
  } = props;
  const resolver = useYupValidationResolver(changePasswordSchema);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({ resolver, mode: 'onChange' });
  const [showBg, setShowBg] = useState(false);
  return (
    <View padding={'16 px'}>
      <View>
        <Image
          source={{ uri: imageId }}
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
          {questionNumber + 1}. {question}
        </Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Type in your answer:
        </Text>
        <TextInput
          placeholder={'Type in your answer'}
          name="shortAnswer"
          control={control}
          errors={errors}
        />
      </View>

      <MemoryRecallAnswerButtons
        questionNumber={questionNumber}
        answer={'a'}
        questionType={'short answer'}
        showAnswer={false}
        setQuestionNumber={setQuestionNumber}
        totalQuestion={totalQuestion}
        setShowBg={setShowBg}
      />
    </View>
  );
};

export default ShortAnswerMemoryRecallQuestion;
