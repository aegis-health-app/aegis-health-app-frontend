import { Box, ScrollView, VStack } from 'native-base';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
// import { useTranslation } from 'react-i18next';
import ForgotPasswordStage1 from '../components/molecules/ForgotPasswordStage1';
import ForgotPasswordStage2 from '../components/molecules/ForgotPasswordStage2';
import ForgotPasswordStage3 from '../components/molecules/ForgotPasswordStage3';
import { client } from '../config/axiosConfig';
import { UserContext } from '../contexts/UserContext';
import useDimensions from '../hooks/useDimensions';

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
    watch
  } = useForm();
  // const { t } = useTranslation();
  const { ScreenHeight } = useDimensions();
  const [stage, setStage] = useState(stages.first);
  const [otpToken, setOtpToken] = useState();
  const [number, setNumber] = useState();
  const { userToken } = useContext(UserContext);

  const continueToNextStage = useCallback(
    async (data) => {
      console.log(stage);
      if (stage === stages.first) {
        try {
          const { phoneNumber } = data;
          console.log(phoneNumber);
          console.log(userToken);
          const res = await client.get(`/otp/request/${phoneNumber}`);
          console.log(res.data);
          setNumber(phoneNumber);
          setOtpToken(res.data.token);
          setStage(stages.second);
        } catch (err) {
          console.log(err);
        }
      } else if (stage === stages.second) {
        try {
          const { otp } = data;
          const payload = {
            token: otpToken,
            pin: otp
          };
          const res = await client.post('/otp/verifyOtp', payload);
          console.log(res.data);
          if (res.data.status === 'success') {
            setStage(stages.third);
          } else {
            console.log('wrong pin');
          }
        } catch (err) {
          console.log('error');
        }
      } else if (stage === stages.third) {
        // WIP: need to wait for backend api endpoint
        console.log('reset password');
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
            <ForgotPasswordStage3
              control={control}
              errors={errors}
              watch={watch}
              handleSubmit={handleSubmit}
            />
          )}
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNUP} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
