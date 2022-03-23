import { Box, Button, ScrollView, VStack } from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import TextInput from '../components/atoms/TextInput';
import { useTranslation } from 'react-i18next';

const SignUpScreen = () => {
  const {
    control,
    formState: { errors }
  } = useForm();

  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack px={2}>
          <FormHeader headerText={t('auth.signUp')} mt={10} mb={7} />
          <TextInput
            label={t('18')}
            name="phoneNumber"
            control={control}
            errors={errors}
            mb={6}
          />
          <TextInput
            label={t('auth.password')}
            name="password"
            control={control}
            errors={errors}
            mb={6}
          />
          <Button w="full">{t('auth.continue')}</Button>
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNUP} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
