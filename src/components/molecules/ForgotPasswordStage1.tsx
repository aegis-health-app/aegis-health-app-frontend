import { Button, VStack } from 'native-base';
import React from 'react';
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
  handleSubmit: any;
  continueToNextStage: any;
};

const ForgotPasswordStage1 = ({
  control,
  errors,
  watch,
  handleSubmit,
  continueToNextStage
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
      {watch('phoneNumber')?.match(
        /^((((\+66|66|0)\d{2})-?\d{3}-?\d{4})|(-))$/
      ) ? (
        <Button w="full" onPress={handleSubmit(continueToNextStage)}>
          {t('auth.continue')}
        </Button>
      ) : (
        <Button w="full" isDisabled>
          {t('auth.continue')}
        </Button>
      )}
    </VStack>
  );
};

export default ForgotPasswordStage1;
