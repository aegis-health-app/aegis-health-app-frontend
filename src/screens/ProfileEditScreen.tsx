import { Platform, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, Image, Radio, ScrollView, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { UserContext } from '../contexts/UserContext';
import { userProfileSchema } from '../interfaces/User';
import Divider from '../components/atoms/Divider';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { LANGUAGES, useSettings } from '../hooks/useSettings';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useForm } from 'react-hook-form';
import TextInput from '../components/atoms/TextInput';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { User, BloodType, GenderEnum } from '../dto/modules/user.dto';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from 'react-native-image-picker';
import {
  CameraPhotoOptions,
  requestCameraPermission
} from '../utils/permission';
import { client } from '../config/axiosConfig';
import Alert, { AlertType } from '../components/organisms/Alert';

// Temporary profile image
const ProfilePic = require('../assets/images/profile.png');

const ProfileEditScreen = () => {
  const { t } = useTranslation();
  const { user, getUserProfile } = useContext(UserContext);
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();
  const [initialValues, setInitialValues] = useState<User | undefined>(user);
  const [showImageUploadError, setShowImageUploadError] =
    useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const resolver = useYupValidationResolver(userProfileSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver,
    mode: 'onTouched'
  });

  const [date, setDate] = useState(new Date(700938977));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setShow(false);
    setDate(new Date(currentDate));
    if (user) {
      setInitialValues({
        ...user,
        bday: currentDate.toString()
      });
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const getFormattedDate = (tempDate: Date) => {
    const momentDate = moment(tempDate, 'MM/DD/YYYY');
    if (language === LANGUAGES.THAI) momentDate.add(543, 'years');
    return momentDate.format('MM/DD/YYYY');
  };

  const takePicture = async () => {
    requestCameraPermission().then(async () => {
      const result: ImagePickerResponse = await launchCamera(
        CameraPhotoOptions
      );
      setNewProfileImage(result);
    });
  };

  const selectPictureFromDevice = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(
      CameraPhotoOptions
    );
    setNewProfileImage(result);
  };

  const uploadNewProfileImage = async () => {
    if (!newProfileImage?.assets) return;
    const formData = new FormData();
    const profileImage = newProfileImage.assets[0];
    if (profileImage.uri && user) {
      formData.append('file', {
        uri:
          Platform.OS === 'android'
            ? profileImage.uri
            : profileImage.uri.replace('file://', ''),
        name: profileImage.fileName,
        type: profileImage.type
      });
      try {
        const { data } = await client.post(`/user/profile/image`, formData);
        if (data) getUserProfile();
      } catch (error) {
        setShowImageUploadError(true);
      }
    }
  };

  const updateUserProfile = async (payload) => {
    client
      .patch('/user', payload)
      .then(() => {
        setShowSuccessAlert(true);
        getUserProfile();
      })
      .catch(() => {
        setShowErrorAlert(true);
      });
  };

  // TODO: Update the parameter type with DTO form backend
  const submitUpdatedProfileInfo = async (payload) =>
    updateUserProfile(payload);

  const onFormSubmit = async (data) => {
    data = {
      ...data,
      gender: initialValues?.gender || GenderEnum.male,
      bday: initialValues?.bday
        ? moment(initialValues?.bday, 'YYYY-MM-DD')
        : date.toLocaleDateString('en-us'),
      bloodType: initialValues?.bloodType
    };
    submitUpdatedProfileInfo(data).then(() => {
      if (newProfileImage && newProfileImage?.assets) uploadNewProfileImage();
    });
  };

  const getImage = () => {
    if (newProfileImage && newProfileImage.assets)
      return { uri: newProfileImage.assets[0].uri };
    if (user?.imageid) return { uri: user.imageid };
    return ProfilePic;
  };

  return (
    <KeyboardAvoidingView>
      <Alert
        isOpen={showImageUploadError}
        close={() => setShowImageUploadError(false)}
        type={AlertType.ERROR}
        message="uploadImageError"
      />
      <Alert
        isOpen={showErrorAlert}
        close={() => setShowErrorAlert(false)}
        type={AlertType.ERROR}
        message="updateProfileError"
      />
      <Alert
        isOpen={showSuccessAlert}
        close={() => {
          setShowSuccessAlert(false);
          if (!showImageUploadError) navigation.navigate('ProfileScreen');
        }}
        type={AlertType.SUCCESS}
        message="updateProfileSuccess"
      />
      <ScrollView style={styles.pageContainer}>
        <View style={styles.profileInfoItemRow}>
          <Text fontSize="2xl" fontWeight="700">
            {t('profile.details')}
          </Text>
        </View>
        <Spacer />
        <View display="flex" flexDir="row" justifyContent="center">
          <Image
            source={getImage()}
            width="32"
            height="32"
            borderRadius={4}
            alt="Profile Picture"
          />
        </View>
        <Spacer />
        <View justifyContent="center" alignItems="center">
          <Button width={48} onPress={() => takePicture()}>
            {t('userForm.takePic')}
          </Button>
          <Spacer />
          <Button width={48} onPress={() => selectPictureFromDevice()}>
            {t('userForm.fromDevice')}
          </Button>
          <Spacer />
        </View>

        <View>
          {/* First Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.name')}
              placeholder={t('profile.name')}
              defaultValue={initialValues?.fname}
              name="fname"
              control={control}
              errors={errors}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.lastName')}
              placeholder={t('profile.lastName')}
              defaultValue={initialValues?.lname}
              name="lname"
              control={control}
              errors={errors}
            />
          </View>

          {/* Display Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.displayName')}
              placeholder={t('profile.displayName')}
              defaultValue={initialValues?.dname}
              name="dname"
              control={control}
              errors={errors}
            />
          </View>

          {/* Gender */}
          <Text fontSize={16} mb={2}>
            {t('profile.birthGender')}
          </Text>
          <View style={styles.profileInfoItemRow}>
            <View style={styles.toggleButtonsContainer}>
              <Button
                variant={
                  initialValues?.gender === GenderEnum.male
                    ? 'solid'
                    : 'outline'
                }
                onPress={() => {
                  if (user) {
                    setInitialValues({
                      ...user,
                      gender: GenderEnum.male
                    });
                  }
                }}>
                {t('userForm.male')}
              </Button>
              <Spacer h={0} />
              <Button
                variant={
                  initialValues?.gender === GenderEnum.female
                    ? 'solid'
                    : 'outline'
                }
                onPress={() => {
                  if (user) {
                    setInitialValues({
                      ...user,
                      gender: GenderEnum.female
                    });
                  }
                }}>
                {t('userForm.female')}
              </Button>
            </View>
          </View>
          <Spacer />

          {/* Birthdate */}
          <Text fontSize={16} mb={2}>
            {t('profile.birthDate')}
          </Text>
          {(Platform.OS === 'ios' || show) && (
            <View style={styles.profileInfoItemRow}>
              {Platform.OS === 'ios' && (
                <Text w={100}>{getFormattedDate(date)}</Text>
              )}
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                onChange={onDateChange}
                mode={mode as any}
                style={Platform.OS === 'ios' ? { width: 124 } : null}
              />
            </View>
          )}
          <View>
            {Platform.OS === 'android' && (
              <View style={styles.profileInfoItemRow}>
                <Text w={100}>{getFormattedDate(date)}</Text>
                <Button onPress={() => showDatepicker()}>
                  {t('userForm.editBirthdate')}
                </Button>
              </View>
            )}
          </View>
          <Spacer />

          {/* Health Issues */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.healthIssues')}
              placeholder={t('profile.healthIssues')}
              defaultValue={initialValues?.healthCondition ?? ''}
              name="healthCondition"
              control={control}
              errors={errors}
            />
          </View>

          {/* Personal Medicine */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.personalMedicine')}
              placeholder={t('profile.personalMedicine')}
              defaultValue={initialValues?.personalMedication ?? ''}
              name="personalMedication"
              control={control}
              errors={errors}
            />
          </View>

          {/* Allergens */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.allergens')}
              placeholder={t('profile.allergens')}
              defaultValue={initialValues?.allergy ?? ''}
              name="allergy"
              control={control}
              errors={errors}
            />
          </View>

          {/* Previous Vaccinations */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.previousVaccinations')}
              placeholder={t('profile.previousVaccinations')}
              defaultValue={initialValues?.vaccine ?? ''}
              name="vaccine"
              control={control}
              errors={errors}
            />
          </View>

          {/* Blood Type */}
          <Text fontSize={16} mb={2}>
            {t('profile.bloodType')}
          </Text>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={user?.bloodType}
            defaultValue={user?.bloodType}
            onChange={(nextValue: BloodType) => {
              if (user) {
                setInitialValues({
                  ...user,
                  bloodType: nextValue
                });
              }
            }}>
            <Radio value="N/A" my={1}>
              N/A
            </Radio>
            <Radio value="A" my={1}>
              A
            </Radio>
            <Radio value="B" my={1}>
              B
            </Radio>
            <Radio value="O" my={1}>
              O
            </Radio>
            <Radio value="AB" my={1}>
              AB
            </Radio>
          </Radio.Group>
        </View>
        <Divider />
        <View justifyContent="center" alignItems="center">
          <Button w="100%" onPress={handleSubmit(onFormSubmit)}>
            {t('userForm.saveChange')}
          </Button>
          <Spacer />
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => navigation.goBack()}>
            {t('userForm.cancel')}
          </Button>
          <Spacer />
        </View>
        <Spacer h={32} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  profileInfoItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileInfoItemLabel: {
    width: 150
  },
  profileInfoItemValue: {
    width: '100%'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  },
  inputRow: {
    minHeight: 95
  }
});
