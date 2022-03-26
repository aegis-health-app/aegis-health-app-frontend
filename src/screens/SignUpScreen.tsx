import { Box, Button, ScrollView, VStack } from 'native-base';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import TextInput, {
  TextInputValidationType
} from '../components/atoms/TextInput';
import { useTranslation } from 'react-i18next';
import useDimensions from '../hooks/useDimensions';
import { View } from 'react-native';
import Divider from '../components/atoms/Divider';
import FormDescription from '../components/atoms/FormDescription';
import ControlledRadioGroup from '../components/molecules/ControlledRadioGroup';
import PictureSelection from '../components/organisms/PictureSelection';
import SignUpStageOne from '../components/organisms/SignUpStageOne';
import SignUpStageTwo from '../components/organisms/SignUpStageTwo';
import { ImagePickerResponse } from 'react-native-image-picker';

interface InformationList {
  label: string;
  placeholder?: string;
  name: string;
  type: string;
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

  const [signUpStage, setSignUpStage] = useState<number>(1);

  const [gender, setGender] = useState('male');

  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();

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
        {
          label: 'profile.name',
          name: 'name',
          type: TextInputValidationType.NAME
        },
        {
          label: 'profile.lastName',
          name: 'lastName',
          type: TextInputValidationType.NAME
        },
        {
          label: 'profile.displayName',
          name: 'displayName',
          type: 'text'
        },
        { label: 'profile.birthDate', name: 'birthDate', type: 'birthDate' },
        { label: 'profile.birthGender', name: 'birthGender', type: 'gender' },
        {
          label: 'profile.phoneNumber',
          name: 'phoneNumber',
          type: TextInputValidationType.PHONE
        },
        { label: 'auth.password', name: 'password', type: 'password' },
        {
          label: 'auth.confirmPassword',
          name: 'confirmPassword',
          type: 'password'
        }
      ],
      [],
      [
        { label: 'profile.healthIssues', name: 'healthIssues', type: 'text' },
        {
          label: 'profile.personalMedicine',
          name: 'personalMedicine',
          type: 'text'
        },
        { label: 'profile.allergens', name: 'allergens', type: 'text' },
        {
          label: 'profile.previousVaccinations',
          name: 'previousVaccinations',
          type: 'text'
        },
        { label: 'profile.bloodType', name: 'bloodType', type: 'bloodGroup' }
      ]
    ],
    []
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack px={4} minH={ScreenHeight}>
          <FormHeader headerText={t('auth.signUp')} mt={16} />
          <Divider my={2} />
          {signUpStage === 1 && (
            <SignUpStageOne
              informationList={informationList}
              gender={gender}
              setGender={setGender}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              continueToNextStage={continueToNextStage}
            />
          )}
          {signUpStage === 2 && (
            <SignUpStageTwo
              watch={watch}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              backToPreviousStage={backToPreviousStage}
              continueToNextStage={continueToNextStage}
            />
          )}

          {signUpStage === 3 && (
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
          )}

          {signUpStage === 4 && (
            <View>
              <FormHeader
                headerText={t('auth.uploadProfile')}
                my={2}
                size={20}
              />
              <FormDescription text={t('auth.uploadProfileDesc')} mb={6} />
              <PictureSelection
                isIndependent={false}
                dependentImage={newProfileImage}
                setDependentImage={setNewProfileImage}
              />
            </View>
          )}

          <Box flex={1} />
          {signUpStage < 4 ? (
            <AuthFooter page={AuthType.SIGNUP} />
          ) : (
            <Button w="full" onPress={handleSubmit(continueToNextStage)} mb={4}>
              {t('auth.continue')}
            </Button>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
