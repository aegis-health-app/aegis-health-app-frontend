import { Button, VStack } from 'native-base';
import React from 'react';
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
  handleSubmit: any;
  continueToNextStage: any;
  resendOtp: any;
};

const ForgotPasswordStage2 = ({
  control,
  errors,
  watch,
  handleSubmit,
  continueToNextStage,
  resendOtp
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
      <Button w="full" onPress={handleSubmit(continueToNextStage)}>
        {t('auth.continue')}
      </Button>
      <Spacer />
      <OTPTimerButton onPress={resendOtp} />
    </VStack>
  );
};

export default ForgotPasswordStage2;
