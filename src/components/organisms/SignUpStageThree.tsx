import { Box, Button } from 'native-base';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import FormHeader from '../atoms/FormHeader';
import TextInput from '../atoms/TextInput';
import { InformationList } from '../../screens/SignUpScreen';
import ControlledRadioGroup from '../molecules/ControlledRadioGroup';

const bloodTypes = ['N/A', 'A', 'B', 'O', 'AB'];

const SignUpStageThree = ({
  control,
  errors,
  handleSubmit,
  informationList,
  continueToNextStage
}) => {
  const { t } = useTranslation();

  return (
    <View>
      <FormHeader headerText={t('auth.healthInfo')} my={2} size={20} />
      {informationList[2].map((info: InformationList) => (
        <Box mb={6} key={`${info.label}-${info.name}`}>
          {['text', 'phone', 'name'].includes(info.type) && (
            <TextInput
              label={`${t(info.label)} `}
              placeholder={t(info.placeholder || info.label)}
              name={info.name}
              control={control}
              errors={errors}
            />
          )}

          {info.type === 'bloodGroup' && (
            <ControlledRadioGroup
              label={`${t(info.label)} `}
              choices={bloodTypes}
              defaultValue={bloodTypes[0]}
              name={info.name}
              control={control}
              errors={errors}
            />
          )}
        </Box>
      ))}
      <Button w="full" onPress={handleSubmit(continueToNextStage)}>
        {t('auth.continue')}
      </Button>
    </View>
  );
};

export default SignUpStageThree;
