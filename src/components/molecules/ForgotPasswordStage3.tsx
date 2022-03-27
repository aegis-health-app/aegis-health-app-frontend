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

type ForgotPasswordProps = {
  control: any;
  errors: any;
  watch: any;
  handleSubmit: any;
};

const ForgotPasswordStage3 = ({
  control,
  errors,
  watch,
  handleSubmit
}: ForgotPasswordProps) => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <VStack px={2}>
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
      <Button w="full" onPress={() => console.log('test')}>
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
