import { useFormik } from 'formik';
import { FormControl, Input, Text, Button, VStack } from 'native-base';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import { useSettings } from '../hooks/useSettings';
import { UserContext } from '../contexts/UserContext';
import moment from 'moment';
import Spacer from '../components/atoms/Spacer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const ChangePhoneNumberScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleSubmit = () => {
    console.log('continue');
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl" fontWeight={'md'}>
            Change password
          </Text>
        </View>
        <Divider my={1} />
        {/* Input new phone number */}
        <View style={styles.title}>
          <Text fontSize="xl" fontWeight={'md'}>
            Enter Your New Phone Number
          </Text>
          <Text fontSize="sm" fontWeight={'regular'} color="gray.400">
            We’ll text you a confirmation code. Message and data rates may
            apply.
          </Text>
        </View>
        <Spacer />
        <VStack space={2}>
          <Button onPress={() => handleSubmit()}>Continue</Button>
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => navigation.goBack()}>
            {t('11')}
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
