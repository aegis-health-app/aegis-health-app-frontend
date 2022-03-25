import { Box, Button, VStack } from 'native-base';
import React from 'react';

import AuthFooter, { AuthType } from '../atoms/AuthFooter';
import FormHeader from '../atoms/FormHeader';
import FormTitle from '../atoms/FormTitle';
import FormDescription from '../atoms/FormDescription';
import TextInput from '../atoms/TextInput';
import { useTranslation } from 'react-i18next';
import Divider from '../atoms/Divider';
import Spacer from '../atoms/Spacer';

type ForgotPasswordProps = {
  control: any;
  errors: any;
  watch: any;
  setStage: any;
};

enum stages {
  first = 1,
  second = 2,
  third = 3
}

const ForgotPasswordStage1 = ({
  control,
  errors,
  watch,
  setStage
}: ForgotPasswordProps) => {
  const { t } = useTranslation();
  return (
    <VStack px={2}>
      <FormHeader headerText={t('changePassword.changePassword')} mt={10} />
      <Divider />
      <FormTitle titleText={t('changePassword.enterPhone')} mb={2} />
      <FormDescription text={t('changePassword.enterPhoneDesc')} />
      <Spacer />
      <Spacer />
      <TextInput
        label={t('changePassword.phoneNumber')}
        name="phoneNumber"
        placeholder={t('general.phonePlaceholder')}
        control={control}
        errors={errors}
      />
      <Spacer />
      <Spacer />
      {watch('phoneNumber')?.match(/^0[0-9]{9}$/) ? (
        <Button w="full" onPress={() => setStage(stages.second)}>
          {t('auth.continue')}
        </Button>
      ) : (
        <Button w="full" isDisabled>
          {t('auth.continue')}
        </Button>
      )}
      <Box flex={1} />
      <AuthFooter page={AuthType.SIGNUP} />
    </VStack>
  );
};

export default ForgotPasswordStage1;
