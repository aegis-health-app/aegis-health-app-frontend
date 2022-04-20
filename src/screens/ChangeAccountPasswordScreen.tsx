import { Text, Button, VStack, Icon } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { ChangePasswordDto } from '../hooks/usePassword';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import TextInput from '../components/atoms/TextInput';
import { client } from '../config/axiosConfig';
import Alert, { AlertType } from '../components/organisms/Alert';
import { usePassword } from '../hooks/usePassword';

const ChangeAccountPasswordScreen = () => {
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const { t } = useTranslation();
  const changePasswordSchema = usePassword();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const resolver = useYupValidationResolver(changePasswordSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver, mode: 'onTouched' });

  const onFormSubmit = async (data) => {
    const payload: ChangePasswordDto = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    };

    try {
      await client.put('/setting/changePassword', payload);
      setShowSuccessAlert(true);
    } catch (err) {
      setShowErrorAlert(true);
    }
  };

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <Alert
        isOpen={showErrorAlert}
        close={() => setShowErrorAlert(false)}
        type={AlertType.ERROR}
        message="changePasswordError"
      />
      <Alert
        isOpen={showSuccessAlert}
        close={() => {
          setShowSuccessAlert(false);
          navigation.navigate('SettingScreen');
        }}
        type={AlertType.SUCCESS}
        message="changePasswordSuccess"
      />
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl" fontWeight={'md'}>
            {t('changePassword.changePassword')}
          </Text>
        </View>
        <Divider my={1} />
        {/* Input old password */}
        <View style={styles.title}>
          <Text fontSize="xl" fontWeight={'md'}>
            {t('changePassword.enterOldPassword')}
          </Text>
        </View>
        <Spacer />
        <View style={styles.inputRow}>
          <TextInput
            label={t('changePassword.oldPassword')}
            placeholder={t('changePassword.oldPassword')}
            name="oldPassword"
            control={control}
            errors={errors}
            type={showOldPassword ? 'text' : 'password'}
            InputRightElement={
              <Icon
                mr={2}
                size="sm"
                h="full"
                as={Ionicons}
                name={showOldPassword ? 'eye' : 'eye-off'}
                color="muted.400"
                onPress={() => setShowOldPassword(!showOldPassword)}
              />
            }
          />
        </View>
        <Spacer />
        {/* Input new password */}
        <View>
          <Text fontSize="xl" fontWeight={'md'}>
            {t('changePassword.enterNewPassword')}
          </Text>
          <Spacer />
          {/* Old Password */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('changePassword.newPassword')}
              placeholder={t('changePassword.newPassword')}
              name="newPassword"
              control={control}
              errors={errors}
              type={showNewPassword ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  mr={2}
                  size="sm"
                  h="full"
                  as={Ionicons}
                  name={showNewPassword ? 'eye' : 'eye-off'}
                  color="muted.400"
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
          </View>
          <Spacer />
          <View style={styles.inputRow}>
            <TextInput
              label={t('changePassword.repeatNewPassword')}
              placeholder={t('changePassword.repeatNewPassword')}
              name="repeatNewPassword"
              control={control}
              errors={errors}
              type={showRepeatPassword ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  mr={2}
                  size="sm"
                  h="full"
                  as={Ionicons}
                  name={showRepeatPassword ? 'eye' : 'eye-off'}
                  color="muted.400"
                  onPress={() => setShowRepeatPassword(!showRepeatPassword)}
                />
              }
            />
          </View>
        </View>
        <Spacer h={24} />
        {/* Buttons */}
        <VStack space={2}>
          <Button onPress={handleSubmit(onFormSubmit)}>
            {t('changePassword.changePassword')}
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
