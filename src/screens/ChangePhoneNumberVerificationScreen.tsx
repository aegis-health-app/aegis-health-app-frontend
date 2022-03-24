import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Text, VStack } from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import TextInput from '../components/atoms/TextInput';
import { phoneNumberVerificationCodeSchema } from '../dto/PhoneVerificationCode';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { RootStackParamList } from '../navigation/types';

const ChangePhoneNumberVerificationScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [codeValid, setCodeValid] = useState(false);
  const resolver = useYupValidationResolver(phoneNumberVerificationCodeSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver, mode: 'onTouched' });
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
            Enter the verification code sent to
          </Text>
        </View>
        <Spacer />
        <Spacer />
        <View style={styles.inputRow}>
          <TextInput
            label="Verification Code"
            name="verificationCode"
            control={control}
            errors={errors}
            type="text"
          />
        </View>
        <Spacer />
        <VStack space={4}>
          {/* continue button */}
          <Button
            w="100%"
            colorScheme={codeValid ? 'primary' : 'gray'}
            variant="solid"
            disabled={codeValid ? true : false}
            onPress={() => console.log('submitted')}>
            submit
          </Button>
          {/* Resend verification code button */}
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => navigation.goBack()}>
            Resend Verification Code 0:59 Secs
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
