import { Image, Text, View } from 'native-base';
import React from 'react';
import TextInput from '../atoms/TextInput';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import {
  ChangePasswordDto,
  changePasswordSchema
} from '../../interfaces/Password';

const ShortAnswerMemoryRecallQuestion = () => {
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
      <View>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          1. question place holder
        </Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          Type in your answer:
        </Text>
        <TextInput
          placeholder={'Type in your answer'}
          name="newPassword"
          control={control}
          errors={errors}
        />
      </View>
    </View>
  );
};

export default ShortAnswerMemoryRecallQuestion;
