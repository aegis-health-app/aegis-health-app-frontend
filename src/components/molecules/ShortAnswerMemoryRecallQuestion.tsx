import { Image, Text, View } from 'native-base';
import React from 'react';
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
};

const ShortAnswerMemoryRecallQuestion = (props: Props) => {
  const { questionNumber, mid, question, imageId, setQuestionNumber } = props;
  const resolver = useYupValidationResolver(changePasswordSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver, mode: 'onTouched' });
  return (
    <View padding={'16 px'}>
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
      <Spacer />
      <View>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {questionNumber + 1}.{question}
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
        shouldShowAnswer={false}
        setQuestionNumber={setQuestionNumber}
      />
    </View>
  );
};

export default ShortAnswerMemoryRecallQuestion;
