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
import { changePasswordSchema } from '../dto/Password';

const ChangeAccountPasswordScreen = () => {
  const { t } = useTranslation();
  const { userProfile, setUserProfile } = useContext(UserContext);
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  };
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: changePasswordSchema,
      onSubmit: (data) => {
        onFormSubmit(data);
      }
    });

  const onFormSubmit = (data) => {
    console.log('submit password change', data);
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
        {/* Input old password */}
        <View style={styles.title}>
          <Text fontSize="xl" fontWeight={'md'}>
            Enter Your Old Password
          </Text>
        </View>
        <View style={styles.inputRow}>
          <FormControl isInvalid={'oldPassword' in errors}>
            <FormControl.Label>{t('Password')}</FormControl.Label>
            <Input
              onBlur={handleBlur('oldPassword')}
              placeholder={t('Password')}
              onChangeText={handleChange('oldPassword')}
              value={values.newPassword}
            />
            <FormControl.ErrorMessage mt={0}>
              {touched.oldPassword ? errors.oldPassword : ''}
            </FormControl.ErrorMessage>
          </FormControl>
        </View>
        <Spacer />
        {/* Input new password */}
        <View>
          <Text fontSize="xl" fontWeight={'md'}>
            Enter Your New Password
          </Text>
          {/* Old Password */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'newPassword' in errors}>
              <FormControl.Label>{t('Password')}</FormControl.Label>
              <Input
                onBlur={handleBlur('newPassword')}
                placeholder={t('Password')}
                onChangeText={handleChange('newPassword')}
                value={values.newPassword}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.newPassword ? errors.newPassword : ''}
              </FormControl.ErrorMessage>
            </FormControl>
            <Spacer />
            <FormControl isInvalid={'repeatNewPassword' in errors}>
              <FormControl.Label>{t('Password')}</FormControl.Label>
              <Input
                onBlur={handleBlur('repeatNewPassword')}
                placeholder={t('Password')}
                onChangeText={handleChange('repeatNewPassword')}
                value={values.repeatNewPassword}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.repeatNewPassword ? errors.repeatNewPassword : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>
        </View>
        <View style={styles.inputRow}>{/* f */}</View>
        {/* Buttons */}
        <VStack space={2}>
          <Button onPress={() => handleSubmit()}>Change password</Button>
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

export default ChangeAccountPasswordScreen;

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
