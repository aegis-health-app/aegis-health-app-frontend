import { Box, Button, HStack, Text } from 'native-base';
import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettings } from '../../hooks/useSettings';
import FormHeader from '../atoms/FormHeader';
import TextInput, { PasswordTextInput } from '../atoms/TextInput';
import { getFormattedDate } from '../../utils/getFormattedDate';
import Spacer from '../atoms/Spacer';

const SignUpStageOne = ({
  informationList,
  gender,
  setGender,
  control,
  errors,
  handleSubmit,
  continueToNextStage
}) => {
  const { t } = useTranslation();
  const { language } = useSettings();

  const [date, setDate] = useState(new Date(700938977));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setShow(false);
    setDate(new Date(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  return (
    <View>
      <FormHeader headerText={t('auth.generalInfo')} my={2} size={20} />
      {informationList[0].map((info) => (
        <Box mb={6} key={`${info.label}-${info.name}`}>
          {!info.type && (
            <TextInput
              label={`${t(info.label)} `}
              placeholder={t(info.placeholder || info.label)}
              name={info.name}
              control={control}
              errors={errors}
              hasRequiredStar
              isRequired
              errorMessage={t('error.isRequired', {
                name: t(info.label)
              })}
            />
          )}

          {info.type === 'password' && (
            <PasswordTextInput
              label={`${t(info.label)} `}
              placeholder={t(info.placeholder || info.label)}
              name={info.name}
              control={control}
              errors={errors}
              hasRequiredStar
              isRequired
              errorMessage={t('error.isRequired', {
                name: t(info.label)
              })}
            />
          )}

          {info.type === 'birthDate' && (
            <>
              <Text fontSize={16} mb={2}>
                {t('profile.birthDate')}
              </Text>
              {(Platform.OS === 'ios' || show) && (
                <HStack justifyContent="space-between" alignItems="center">
                  {Platform.OS === 'ios' && (
                    <Text w={100}>{getFormattedDate(date, language)}</Text>
                  )}
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    onChange={onDateChange}
                    mode={mode as any}
                    style={Platform.OS === 'ios' ? { width: 124 } : null}
                  />
                </HStack>
              )}
              {Platform.OS === 'android' && (
                <HStack justifyContent="space-between" alignItems="center">
                  <Text w={100}>{getFormattedDate(date, language)}</Text>
                  <Button variant="outline" onPress={() => showDatepicker()}>
                    {t('userForm.editBirthdate')}
                  </Button>
                </HStack>
              )}
            </>
          )}

          {info.type === 'gender' && (
            <>
              <Text fontSize={16} mb={2}>
                {t('profile.birthGender')}
              </Text>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack justifyContent="flex-start">
                  <Button
                    minWidth={20}
                    variant={gender === 'male' ? 'solid' : 'outline'}
                    onPress={() => {
                      setGender('male');
                    }}>
                    {t('userForm.male')}
                  </Button>
                  <Spacer />
                  <Button
                    minWidth={20}
                    variant={gender === 'female' ? 'solid' : 'outline'}
                    onPress={() => {
                      setGender('female');
                    }}>
                    {t('userForm.female')}
                  </Button>
                </HStack>
              </HStack>
            </>
          )}
        </Box>
      ))}
      <Button w="full" onPress={handleSubmit(continueToNextStage)}>
        {t('auth.continue')}
      </Button>
    </View>
  );
};

export default SignUpStageOne;
