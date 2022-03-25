import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import TextInput from '../components/atoms/TextInput';
import ControlledOTPInput from '../components/molecules/ControlledOTPInput';
import { phoneNumberVerificationCodeSchema } from '../dto/PhoneVerificationCode';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { RootStackParamList } from '../navigation/types';

const ChangePhoneNumberVerificationScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { phoneNumber } = route.params;
  const [codeValid, setCodeValid] = useState(false);
  const resolver = useYupValidationResolver(phoneNumberVerificationCodeSchema);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({ resolver, mode: 'onChange' });

  const shouldDisable = (errors) => {
    return errors['verificationCode']?.message;
  };

  const onFormSubmit = (data) => {
    console.log({ data });
  };

  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const timer = () => {
    if (resendTimer > 0) {
      setResendTimer(resendTimer - 1);
      return;
    } else {
      setCanResend(true);
    }
    return;
  };
  useEffect(() => {
    const resendInterval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(resendTimer - 1);
      } else {
        clearInterval(resendInterval);
      }
    }, 1000);
  }, [resendTimer]);

  const resendVerificationCode = () => {
    console.log('resend the otp');
    setResendTimer(60);
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl" fontWeight={'md'}>
            Change Phone Number
          </Text>
        </View>
        <Divider my={1} />
        {/* Input new phone number */}
        <View style={styles.title}>
          <Text fontSize="xl" fontWeight={'md'}>
            Enter Your Verification Code
          </Text>
          <Text fontSize="sm" fontWeight={'regular'} color="gray.400">
            Enter the verification code sent to {phoneNumber}
          </Text>
        </View>
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
        <VStack space={4}>
          {/* continue button */}
          <Button
            w="100%"
            backgroundColor={
              // @ts-ignore
              !shouldDisable(errors)
                ? // (getValues('otp') as string).toString().length === 6
                  'primary.500'
                : 'muted.300'
            }
            colorScheme={'primary'}
            variant="solid"
            disabled={codeValid ? true : false}
            onPress={handleSubmit(onFormSubmit)}>
            submit
          </Button>
          {/* Resend verification code button */}
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => resendVerificationCode()}>
            Resend Verification Code 0:{resendTimer} Secs
          </Button>
          {/* cancle button */}
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => navigation.goBack()}>
            {t('changePassword.cancelButton')}
          </Button>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export default ChangePhoneNumberVerificationScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  inputRow: {
    minHeight: 95
  },
  title: {
    marginTop: 28
  }
});
