import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import OTPTimerButton from '../components/atoms/OTPTimerButton';
import Spacer from '../components/atoms/Spacer';
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
    watch
  } = useForm({ resolver, mode: 'onChange' });

  const shouldDisable = (errors) => {
    return errors['verificationCode']?.message;
  };

  const onFormSubmit = (data) => {
    console.log({ data });
    console.log('send verification code');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl" fontWeight={'md'}>
            {t('changePhoneNumber.changePhoneNumber')}
          </Text>
        </View>
        <Divider my={1} />
        {/* Input new phone number */}
        <View style={styles.title}>
          <Text fontSize="xl" fontWeight={'md'}>
            {t('changePhoneNumber.enterYourVerificationCode')}
          </Text>
          <Text fontSize="sm" fontWeight={'regular'} color="gray.400">
            {t('changePhoneNumber.verificationCodeSentTo')} {phoneNumber}
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
              !shouldDisable(errors) && watch('otp')?.length === 6
                ? 'primary.500'
                : 'muted.300'
            }
            colorScheme={'primary'}
            variant="solid"
            // disabled={codeValid ? true : false}
            onPress={handleSubmit(onFormSubmit)}>
            {t('changePhoneNumber.submit')}
          </Button>
          {/* Resend verification code button */}
          <OTPTimerButton onPress={() => console.log('Sending OTP')} />
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
