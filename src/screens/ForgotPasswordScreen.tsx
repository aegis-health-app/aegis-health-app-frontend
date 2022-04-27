import { t } from 'i18next';
import { Box, ScrollView, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import ForgotPasswordStage1 from '../components/molecules/ForgotPasswordStage1';
import ForgotPasswordStage2 from '../components/molecules/ForgotPasswordStage2';
import ForgotPasswordStage3 from '../components/molecules/ForgotPasswordStage3';
import { client } from '../config/axiosConfig';
import useDimensions from '../hooks/useDimensions';
import { requestOTP, verifyOTP } from '../utils/auth';

enum stages {
  first = 1,
  second = 2,
  third = 3
}

const ForgotPasswordScreen = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError
  } = useForm();

  const { ScreenHeight } = useDimensions();
  const [stage, setStage] = useState(stages.first);
  const [otpToken, setOtpToken] = useState('');
  const [number, setNumber] = useState<string>('');

  const continueToNextStage = useCallback(
    async (data) => {
      if (stage === stages.first) {
        try {
          const { phoneNumber } = data;
          const res = await requestOTP(phoneNumber);
          setNumber(phoneNumber);
          setOtpToken(res.data.token);
          setStage(stages.second);
        } catch (err) {
          console.log(err);
        }
      } else if (stage === stages.second) {
        try {
          const { otp } = data;
          const res = await verifyOTP(otpToken, otp);
          console.log(res.data);
          if (res.data.status === 'success') {
            setStage(stages.third);
          } else {
            setError('otp', {
              type: 'custom',
              message: t('general.incorrectOtp')
            });
          }
        } catch (err) {
          setError('otp', {
            type: 'custom',
            message: t('general.incorrectOtp')
          });
        }
      } else if (stage === stages.third) {
        // WIP: need to wait for backend api endpoint
        // Moved this logic into stage3 file
      }
    },
    [stage]
  );

  const resendOtp = async () => {
    const res = await client.get(`/otp/request/${number}`);
    setOtpToken(res.data.token);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack minH={ScreenHeight}>
          {stage === stages.first ? (
            <ForgotPasswordStage1
              control={control}
              errors={errors}
              watch={watch}
              handleSubmit={handleSubmit}
              continueToNextStage={continueToNextStage}
            />
          ) : stage === stages.second ? (
            <ForgotPasswordStage2
              control={control}
              errors={errors}
              watch={watch}
              handleSubmit={handleSubmit}
              continueToNextStage={continueToNextStage}
              resendOtp={resendOtp}
            />
          ) : (
            <ForgotPasswordStage3 phoneNumber={number} />
          )}
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNUP} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
