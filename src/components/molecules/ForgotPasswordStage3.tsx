import { Button, Icon, VStack } from 'native-base';
import React, { useState } from 'react';
import FormHeader from '../atoms/FormHeader';
import FormTitle from '../atoms/FormTitle';
import TextInput from '../atoms/TextInput';
import { useTranslation } from 'react-i18next';
import Spacer from '../atoms/Spacer';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Divider from '../atoms/Divider';
import Alert, { AlertType } from '../../components/organisms/Alert';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { forgotPassword } from '../../utils/auth';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import { useForgotPassword } from '../../hooks/useForgotPassword';

type ForgotPasswordProps = {
  phoneNumber: string;
};

const ForgotPasswordStage3 = ({ phoneNumber }: ForgotPasswordProps) => {
  const { t } = useTranslation();
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const forgotPasswordSchema = useForgotPassword();
  const resolver = useYupValidationResolver(forgotPasswordSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver, mode: 'onTouched' });

  const onFormSubmit = async (data) => {
    console.log('press');
    const { newPassword } = data;
    try {
      await forgotPassword(phoneNumber, newPassword);
      setShowSuccessAlert(true);
    } catch (err) {
      setShowErrorAlert(true);
    }
  };

  return (
    <VStack px={2}>
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
          navigation.navigate('SignInScreen');
        }}
        type={AlertType.SUCCESS}
        message="changePasswordSuccess"
      />
      <FormHeader headerText={t('changePassword.changePassword')} mt={10} />
      <Divider />
      <FormTitle titleText={t('changePassword.header')} />
      <Spacer />
      <Spacer />
      <View>
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
        <Spacer />
      </View>
      <Button w="full" onPress={handleSubmit(onFormSubmit)}>
        {t('changePassword.changePassword')}
      </Button>
    </VStack>
  );
};

export default ForgotPasswordStage3;

const styles = StyleSheet.create({
  inputRow: {
    minHeight: 95
  }
});
