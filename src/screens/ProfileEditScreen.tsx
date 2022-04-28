import { StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, Image, Radio, ScrollView, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { UserContext } from '../contexts/UserContext';
import Divider from '../components/atoms/Divider';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useForm } from 'react-hook-form';
import TextInput from '../components/atoms/TextInput';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import { User, BloodType, GenderEnum } from '../dto/modules/user.dto';
import { client } from '../config/axiosConfig';
import Alert, { AlertType } from '../components/organisms/Alert';
import DatePicker from '../components/molecules/DatePicker';
import { useImageSelection } from '../hooks/useImageSelection';
import { ImagePickerResponse } from 'react-native-image-picker';
import { FallbackImageLarge } from '../components/molecules/FallbackImage';
import { useUserValidation } from '../hooks/useUserValidation';

// Temporary profile image
const ProfilePic = require('../assets/images/defaultProfile.png');

const ProfileEditScreen = () => {
  const { t } = useTranslation();
  const { user, getUserProfile } = useContext(UserContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const userProfileSchema = useUserValidation();
  const resolver = useYupValidationResolver(userProfileSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver,
    mode: 'onTouched'
  });

  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();
  const [initialValues, setInitialValues] = useState<User | undefined>(user);
  const [showImageUploadError, setShowImageUploadError] =
    useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [date, setDate] = useState(new Date(700938977));

  const onDateChange = (event, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setDate(new Date(currentDate));
    if (user) {
      setInitialValues({
        ...user,
        bday: currentDate.toString()
      });
    }
  };

  const onNewPictureObtained = (result: ImagePickerResponse) => {
    setNewProfileImage(result);
  };

  const uploadNewProfileImage = async () => {
    if (!newProfileImage?.assets) return;
    const profileImage = newProfileImage.assets[0];
    const imagePayload = {
      base64: profileImage.base64,
      name: profileImage.fileName,
      type: profileImage.type,
      size: profileImage.fileSize
    };
    if (profileImage.base64 && user) {
      try {
        const { data } = await client.post('/user/profile/image', imagePayload);
        if (data) getUserProfile();
      } catch (error) {
        setShowImageUploadError(true);
      }
    }
  };

  const updateUserProfile = async (payload) => {
    try {
      await client.patch('/user/profile', payload);
      setShowSuccessAlert(true);
      getUserProfile();
    } catch (err) {
      setShowErrorAlert(true);
    }
  };

  // TODO: Update the parameter type with DTO form backend
  const submitUpdatedProfileInfo = async (payload) =>
    updateUserProfile(payload);

  const onFormSubmit = (data) => {
    data = {
      ...data,
      gender: initialValues?.gender || GenderEnum.male,
      bday: moment(date ?? initialValues?.bday, 'YYYY/MM/DD HH:mm:ss'),
      bloodType: initialValues?.bloodType
    };
    submitUpdatedProfileInfo(data);
    if (newProfileImage && newProfileImage?.assets) uploadNewProfileImage();
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
          {newProfileImage && newProfileImage.assets && (
            <Image
              source={{ uri: newProfileImage.assets[0].uri }}
              width="32"
              height="32"
              borderRadius={4}
              fallbackElement={FallbackImageLarge}
              alt="Profile Picture"
            />
          )}
          {!newProfileImage && (
            <Image
              source={getImage()}
              width="32"
              height="32"
              borderRadius={4}
              fallbackElement={FallbackImageLarge}
              alt="Profile Picture"
            />
          )}
        </View>
        <Spacer />
        <View justifyContent="center" alignItems="center">
          <Button width={48} onPress={() => takePicture(onNewPictureObtained)}>
            {t('userForm.takePic')}
          </Button>
          <Spacer />
          <Button
            width={48}
            onPress={() => selectPictureFromDevice(onNewPictureObtained)}>
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
          <DatePicker date={date} onDateChange={onDateChange} />
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
