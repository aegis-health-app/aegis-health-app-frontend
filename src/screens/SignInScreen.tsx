import { Image, ScrollView } from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../components/atoms/TextInput';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const authBanner = require('../assets/images/authBanner.png');

const SignInScreen = () => {
  const {
    control,
    formState: { errors }
  } = useForm();

  return (
    <ScrollView>
      {/* <Image source={{ uri: authBanner.default.src }} /> */}
      <TextInput
        label="Phone Number"
        name="phoneNumber"
        control={control}
        errors={errors}
        mx={2}
      />
      <TextInput
        label="Password"
        name="password"
        control={control}
        errors={errors}
        mx={2}
      />
    </ScrollView>
  );
};

export default SignInScreen;
