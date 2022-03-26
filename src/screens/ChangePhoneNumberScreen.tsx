import { Text, Button, VStack } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import TextInput from '../components/atoms/TextInput';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { changePhoneNumberSchema } from '../dto/PhoneNumber';
import { useForm } from 'react-hook-form';

// WORK IN PROGRESS

const ChangePhoneNumberScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const resolver = useYupValidationResolver(changePhoneNumberSchema);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm({ resolver, mode: 'onChange' });

  const onFormSubmit = (data) => {
    navigation.navigate('ChangePhoneNumberVerificationScreen', {
      phoneNumber: data.phoneNumber
    });
    console.log('submit password change', data);
  };

  const shouldDisable = (errors) => {
    return errors['phoneNumber']?.message;
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
            {t('changePhoneNumber.enterPhoneNumber')}
          </Text>
          <Text fontSize="sm" fontWeight={'regular'} color="gray.400">
            {t('changePhoneNumber.enterPhoneNumberDescription')}
          </Text>
        </View>
        <Spacer />
        <Spacer />
        <View style={styles.inputRow}>
          <TextInput
            label={t('changePhoneNumber.phoneNumber')}
            placeholder="0xx-xxx-xxxx"
            name="phoneNumber"
            control={control}
            errors={errors}
            type="text"
            keyboardType="numeric"
          />
        </View>
        <Spacer />
        <VStack space={4}>
          <Button
            w="100%"
            backgroundColor={
              // @ts-ignore
              !shouldDisable(errors) && getValues('phoneNumber')
                ? 'primary.500'
                : 'muted.300'
            }
            colorScheme={'primary'}
            variant="solid"
            onPress={handleSubmit(onFormSubmit)}>
            {t('changePhoneNumber.continue')}
          </Button>
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

export default ChangePhoneNumberScreen;

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
