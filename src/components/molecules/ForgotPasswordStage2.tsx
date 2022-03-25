import { Box, Button, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';

import AuthFooter, { AuthType } from '../atoms/AuthFooter';
import FormHeader from '../atoms/FormHeader';
import FormTitle from '../atoms/FormTitle';
import FormDescription from '../atoms/FormDescription';
import { useTranslation } from 'react-i18next';
import ControlledOTPInput from './ControlledOTPInput';
import Divider from '../atoms/Divider';
import Spacer from '../atoms/Spacer';
import OTPTimerButton from '../atoms/OTPTimerButton';

type ForgotPasswordProps = {
  control: any;
  errors: any;
  watch: any;
  setStage: any;
};

enum stages {
  first = 1,
  second = 2,
  third = 3
}

const ForgotPasswordStage2 = ({
  control,
  errors,
  watch,
  setStage
}: ForgotPasswordProps) => {
  const { t } = useTranslation();

  return (
    <VStack px={2}>
      <FormHeader headerText={t('changePassword.changePassword')} mt={10} />
      <Divider />
      <FormTitle titleText={t('general.enterOTP')} mb={2} />
      <FormDescription
        text={t('general.enterOTPDesc') + watch('phoneNumber')}
      />
      <Spacer />
      <Spacer />
      <ControlledOTPInput
        label={t('general.otp')}
        name="otp"
        errors={errors}
        control={control}
        isRequired
      />
      <Spacer />
      <Button w="full" onPress={() => setStage(stages.third)}>
        {t('auth.continue')}
      </Button>
      <Spacer />
      <OTPTimerButton onPress={() => console.log('Sending OTP')} />
      <Box flex={1} />
      <AuthFooter page={AuthType.SIGNUP} />
    </VStack>
  );
};

export default ForgotPasswordStage2;
