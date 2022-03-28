import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { Button, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import OTPTimerButton from '../components/atoms/OTPTimerButton';
import Spacer from '../components/atoms/Spacer';
import ControlledOTPInput from '../components/molecules/ControlledOTPInput';
import { client } from '../config/axiosConfig';
import { phoneNumberVerificationCodeSchema } from '../dto/PhoneVerificationCode';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { RootStackParamList } from '../navigation/types';
import Alert, { AlertType } from '../components/organisms/Alert';

const ChangePhoneNumberVerificationScreen = ({
  route
}: NativeStackScreenProps<
  RootStackParamList,
  'ChangePhoneNumberVerificationScreen'
>) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { phoneNumber } = route.params;
  const resolver = useYupValidationResolver(phoneNumberVerificationCodeSchema);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ resolver, mode: 'onChange' });

  const shouldDisable = (errors) => {
    return errors['verificationCode']?.message;
  };

  const onFormSubmit = async (input) => {
    const { otp } = input;
    const payload = {
      newPhone: phoneNumber,
      enteredPin: otp
    };
<<<<<<< HEAD
    try {
      const { data } = await client.put('/setting/changePhoneNumber', payload);
      if (data) setShowSuccessAlert(true);
    } catch (err) {
      setShowErrorAlert(true);
    }
=======
    console.log(payload);
    client
      .put('/setting/changePhoneNumber', payload)
      .then(() => {
        setShowSuccessAlert(true);
      })
      .catch((err) => {
        console.log({ err });
        setShowErrorAlert(true);
      });
>>>>>>> 61de8ac (feat: setup alert after change phone number)
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <Alert
        isOpen={showErrorAlert}
        close={() => setShowErrorAlert(false)}
        type={AlertType.ERROR}
<<<<<<< HEAD
<<<<<<< HEAD
        message="changePhoneNumberError"
=======
        message="changePasswordError"
>>>>>>> 61de8ac (feat: setup alert after change phone number)
=======
        message="changePhoneNumberError"
>>>>>>> 5e866f6 (feat: add alert message)
      />
      <Alert
        isOpen={showSuccessAlert}
        close={() => {
          setShowSuccessAlert(false);
          navigation.navigate('SettingScreen');
        }}
        type={AlertType.SUCCESS}
<<<<<<< HEAD
<<<<<<< HEAD
        message="changePhoneNumberSuccess"
        customString={phoneNumber}
=======
        message="changePasswordSuccess"
>>>>>>> 61de8ac (feat: setup alert after change phone number)
=======
        message="changePhoneNumberSuccess"
        customString={phoneNumber}
>>>>>>> 5e866f6 (feat: add alert message)
      />
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl" fontWeight={'md'}>
            {t('changePhoneNumber.changePhoneNumber')}
          </Text>
        </View>
        <Divider my={1} />
        {/* Input verification code */}
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <Text>{JSON.stringify(errors)}</Text>
>>>>>>> 61de8ac (feat: setup alert after change phone number)
=======
>>>>>>> 5e866f6 (feat: add alert message)
        <Spacer />
        <VStack space={4}>
          {/* Continue button */}
          <Button
            w="100%"
            backgroundColor={
              //@ts-ignore
              !shouldDisable(errors) && watch('otp')
                ? 'primary.500'
                : 'muted.300'
            }
            colorScheme={'primary'}
            variant="solid"
            onPress={handleSubmit(onFormSubmit)}>
            {t('changePhoneNumber.submit')}
          </Button>
          {/* Resend verification code button */}
          <OTPTimerButton onPress={() => console.log('Sending OTP')} />
          {/* Cancle button */}
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
