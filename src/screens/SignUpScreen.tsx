import { Box, Button, ScrollView, VStack } from 'native-base';
import React, { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import { TextInputValidationType } from '../components/atoms/TextInput';
import { useTranslation } from 'react-i18next';
import useDimensions from '../hooks/useDimensions';
import { View } from 'react-native';
import Divider from '../components/atoms/Divider';
import FormDescription from '../components/atoms/FormDescription';
import PictureSelection from '../components/organisms/PictureSelection';
import SignUpStageOne from '../components/organisms/SignUpStageOne';
import SignUpStageTwo from '../components/organisms/SignUpStageTwo';
import { ImagePickerResponse } from 'react-native-image-picker';
import { client } from '../config/axiosConfig';
import { useAuthentication } from '../hooks/useAuthentication';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { UserContext } from '../contexts/UserContext';
import { requestOTP, signUp, SignUpPayload, verifyOTP } from '../utils/auth';
import SignUpStageThree from '../components/organisms/SignUpStageThree';

export interface InformationList {
  label: string;
  placeholder?: string;
  name: string;
  type: string;
}

const informationList: InformationList[][] = [
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
];

const SignUpScreen = ({ route }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    watch
  } = useForm();

  const { t } = useTranslation();
  const { ScreenHeight } = useDimensions();
  const { setToken } = useAuthentication();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);

  const [signUpStage, setSignUpStage] = useState<number>(1);
  const [otpToken, setOTPToken] = useState<string>('');

  const [gender, setGender] = useState('M');
  const [date, setDate] = useState(new Date(700938977));

  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();

  const backToPreviousStage = useCallback(() => {
    if (signUpStage > 1) setSignUpStage((prev) => prev - 1);
  }, [signUpStage]);

  const continueToNextStage = useCallback(
    async (data) => {
      const {
        name,
        lastName,
        displayName,
        phoneNumber,
        password,
        healthIssues,
        personalMedicine,
        allergens,
        previousVaccinations,
        bloodType,
        otp
      } = data;

      if (signUpStage === 1) {
        if (data.password === data.confirmPassword) {
          const requestOTPResponse = await requestOTP(phoneNumber);
          setOTPToken(requestOTPResponse.data.token);
          setSignUpStage((prev) => prev + 1);
        } else {
          setError('confirmPassword', {
            type: 'manual',
            message: t('error.passwordNotMatched')
          });
        }
      }

      if (signUpStage === 2) {
        const verifyOTPResponse = await verifyOTP(otpToken, otp);

        if (
          verifyOTPResponse.status === 200 ||
          verifyOTPResponse.data.status === 'success'
        ) {
          setSignUpStage((prev) => prev + 1);
        } else {
          setError('otp', {
            type: 'manual',
            message: t('error.invalid', { name: t('general.otp') })
          });
        }
      }

      if (signUpStage === 3) {
        const { isElderly } = route?.params;
        const payload: SignUpPayload = {
          imageid: '',
          fname: name,
          lname: lastName,
          dname: displayName,
          bday: date.toISOString().substring(0, 10),
          gender: gender,
          isElderly,
          healthCondition: healthIssues,
          bloodType: bloodType === 'N/A' ? '' : bloodType,
          personalMedication: personalMedicine,
          allergy: allergens,
          vaccine: previousVaccinations,
          phone: phoneNumber,
          password: password
        };

        const signUpResponse = await signUp(payload);
        if (signUpResponse.data) {
          setToken(signUpResponse.data.token);
          setSignUpStage((prev) => prev + 1);
        }
      }
      if (signUpStage === 4) {
        if (newProfileImage) {
          const formData = new FormData();
          formData.append('file', newProfileImage);
          const imageUploadResponse = await client.post(
            `user/profile/${user?.uid}/image`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );
          const patchResponse = await client.patch('user', {
            imageid: imageUploadResponse.data.imageUrl
          });
          if (patchResponse.data) {
            navigation.replace('TabNavigation');
          }
        } else navigation.replace('TabNavigation');
      }
    },
    [
      signUpStage,
      newProfileImage,
      navigation,
      setSignUpStage,
      client,
      route,
      otpToken
    ]
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
              date={date}
              setDate={setDate}
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
            <SignUpStageThree
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              informationList={informationList}
              continueToNextStage={continueToNextStage}
            />
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
            <Button
              w="full"
              onPress={handleSubmit(continueToNextStage)}
              mb={4}
              variant={newProfileImage ? 'solid' : 'outline'}>
              {t(newProfileImage ? 'auth.continue' : 'misc.maybeLater')}
            </Button>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
