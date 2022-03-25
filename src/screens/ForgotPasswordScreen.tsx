import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import ForgotPasswordStage1 from '../components/molecules/ForgotPasswordStage1';
import ForgotPasswordStage2 from '../components/molecules/ForgotPasswordStage2';
import ForgotPasswordStage3 from '../components/molecules/ForgotPasswordStage3';

enum stages {
  first = 1,
  second = 2,
  third = 3
}

const ForgotPasswordScreen = () => {
  const {
    control,
    formState: { errors },
    watch
  } = useForm();

  const [stage, setStage] = useState(stages.first);

  return (
    <SafeAreaView>
      <ScrollView>
        {stage === stages.first ? (
          <ForgotPasswordStage1
            control={control}
            errors={errors}
            watch={watch}
            setStage={setStage}
          />
        ) : stage === stages.second ? (
          <ForgotPasswordStage2
            control={control}
            errors={errors}
            watch={watch}
            setStage={setStage}
          />
        ) : (
          <ForgotPasswordStage3
            control={control}
            errors={errors}
            watch={watch}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
