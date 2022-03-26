import { Button, Pressable, Text } from 'native-base';
import React, { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import FormHeader from '../atoms/FormHeader';
import FormDescription from '../atoms/FormDescription';
import ControlledOTPInput from '../molecules/ControlledOTPInput';
import OTPTimerButton from '../atoms/OTPTimerButton';

const SignUpStageTwo = ({
  watch,
  control,
  errors,
  handleSubmit,
  backToPreviousStage,
  continueToNextStage
}) => {
  const { t } = useTranslation();

  const isValidOTP = watch('otp').length === 6;

  const sendOTP = () => null;

  return (
    <View>
      <FormHeader headerText={t('auth.enterOTPCode')} my={2} size={20} />
      <FormDescription
        text={t('auth.otpDetail', { phone: watch('phoneNumber') })}
        mb={4}
      />
      <Pressable onPress={backToPreviousStage}>
        <Text color="blue.600" mb={2}>
          {t('auth.changePhoneNumber')}
        </Text>
      </Pressable>
      <ControlledOTPInput
        label={t('general.otp')}
        name="otp"
        errors={errors}
        control={control}
        isRequired
      />
      <Button
        w="full"
        onPress={handleSubmit(continueToNextStage)}
        mb={4}
        isDisabled={!isValidOTP}>
        {t('auth.submitOTP')}
      </Button>
      <OTPTimerButton onPress={sendOTP} />
    </View>
  );
};

export default SignUpStageTwo;
