import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/atoms/Spacer';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import TextInput, { PasswordTextInput } from '../components/atoms/TextInput';
import { useTranslation } from 'react-i18next';
import ControlledOTPInput from '../components/molecules/ControlledOTPInput';
import useDimensions from '../hooks/useDimensions';
import { Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFormattedDate } from '../utils/getFormattedDate';
import { useSettings } from '../hooks/useSettings';
import Divider from '../components/atoms/Divider';
import FormDescription from '../components/atoms/FormDescription';
import OTPTimerButton from '../components/atoms/OTPTimerButton';
import ControlledRadioGroup from '../components/molecules/ControlledRadioGroup';

interface InformationList {
  label: string;
  placeholder?: string;
  name: string;
  type?: 'password' | 'birthDate' | 'gender' | 'bloodGroup';
}

const bloodTypes = ['N/A', 'A', 'B', 'O', 'AB'];

const SignUpScreen = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  const { t } = useTranslation();
  const { ScreenHeight } = useDimensions();

  const { language } = useSettings();

  const [signUpStage, setSignUpStage] = useState<number>(1);

  const [date, setDate] = useState(new Date(700938977));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('male');

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

  const backToPreviousStage = useCallback(() => {
    if (signUpStage > 1) setSignUpStage((prev) => prev - 1);
  }, [signUpStage]);

  const continueToNextStage = useCallback(() => {
    if (signUpStage === 1) setSignUpStage((prev) => prev + 1);
    if (signUpStage === 2) setSignUpStage((prev) => prev + 1);
    if (signUpStage === 3) setSignUpStage((prev) => prev + 1);
  }, [signUpStage]);

  const informationList: InformationList[][] = useMemo(
    () => [
      [
        { label: 'profile.name', name: 'name' },
        { label: 'profile.lastName', name: 'lastName' },
        { label: 'profile.displayName', name: 'displayName' },
        { label: 'profile.birthDate', name: 'birthDate', type: 'birthDate' },
        { label: 'profile.birthGender', name: 'birthGender', type: 'gender' },
        { label: 'profile.phoneNumber', name: 'phoneNumber' },
        { label: 'auth.password', name: 'password', type: 'password' },
        {
          label: 'auth.confirmPassword',
          name: 'confirmPassword',
          type: 'password'
        }
      ],
      [],
      [
        { label: 'profile.healthIssues', name: 'healthIssues' },
        { label: 'profile.personalMedicine', name: 'personalMedicine' },
        { label: 'profile.allergens', name: 'allergens' },
        { label: 'profile.previousVaccinations', name: 'previousVaccinations' },
        { label: 'profile.bloodType', name: 'bloodType', type: 'bloodGroup' }
      ]
    ],
    []
  );

  const sendOTP = () => null;

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack px={4} minH={ScreenHeight}>
          <FormHeader headerText={t('auth.signUp')} mt={16} />
          <Divider my={2} />
          {signUpStage === 1 && (
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
                        <HStack
                          justifyContent="space-between"
                          alignItems="center">
                          {Platform.OS === 'ios' && (
                            <Text w={100}>
                              {getFormattedDate(date, language)}
                            </Text>
                          )}
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            onChange={onDateChange}
                            mode={mode as any}
                            style={
                              Platform.OS === 'ios' ? { width: 124 } : null
                            }
                          />
                        </HStack>
                      )}
                      {Platform.OS === 'android' && (
                        <HStack
                          justifyContent="space-between"
                          alignItems="center">
                          <Text w={100}>
                            {getFormattedDate(date, language)}
                          </Text>
                          <Button
                            variant="outline"
                            onPress={() => showDatepicker()}>
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
                      <HStack
                        justifyContent="space-between"
                        alignItems="center">
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
          )}
          {signUpStage === 2 && (
            <View>
              <FormHeader
                headerText={t('auth.enterOTPCode')}
                my={2}
                size={20}
              />
              <FormDescription
                text={t('auth.otpDetail', { phone: watch('phoneNumber') })}
                mb={2}
              />
              <Pressable onPress={backToPreviousStage}>
                <Text color="blue.600" mb={2}>
                  {t('auth.changePhoneNumber')}
                </Text>
              </Pressable>
              <ControlledOTPInput
                label={t('general.otp')}
                name="otp"
                errors={errors}
                control={control}
                isRequired
              />
              <Button
                w="full"
                onPress={handleSubmit(continueToNextStage)}
                mb={4}>
                {t('auth.submitOTP')}
              </Button>
              <OTPTimerButton onPress={sendOTP} />
            </View>
          )}

          {signUpStage === 3 && (
            <View>
              <FormHeader headerText={t('auth.healthInfo')} my={2} size={20} />
              {informationList[2].map((info) => (
                <Box mb={6} key={`${info.label}-${info.name}`}>
                  {!info.type && (
                    <TextInput
                      label={`${t(info.label)} `}
                      placeholder={t(info.placeholder || info.label)}
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
          )}

          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNUP} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
