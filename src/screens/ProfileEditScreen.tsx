import { Platform, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Button, Image, Radio, ScrollView, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { UserContext } from '../contexts/UserContext';
import { BloodType, User, userProfileSchema, BirthGender } from '../dto/User';
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

// Temporary profile image
const ProfilePic = require('../assets/images/sompochHD.png');

const ProfileEditScreen = () => {
  const { t } = useTranslation();
  const { userProfile, setUserProfile } = useContext(UserContext);
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialValues: User = {
    firstName: '',
    lastName: '',
    displayName: '',
    birthGender: '',
    birthDate: '',
    healthIssues: '',
    personalMedicine: '',
    allergens: '',
    previousVaccinations: '',
    bloodType: 'N/A'
  };

  const resolver = useYupValidationResolver(userProfileSchema);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver, mode: 'onTouched' });

  const [date, setDate] = useState(new Date(700938977));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = (event, selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setShow(false);
    setDate(new Date(currentDate));
    setUserProfile({
      ...userProfile,
      birthDate: currentDate.toString()
    });
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

  const onFormSubmit = async (data) => {
    data = {
      ...data,
      birthGender: userProfile?.birthGender || BirthGender.MALE,
      birthDate: userProfile?.birthDate
        ? moment(userProfile?.birthDate, 'YYYY-MM-DD')
        : date.toLocaleDateString('en-us'),
      bloodType: userProfile?.bloodType
    };
    console.log({ data });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={styles.pageContainer}>
        <View style={styles.profileInfoItemRow}>
          <Text fontSize="2xl" fontWeight="700">
            {t('profile.details')}
          </Text>
        </View>
        <Spacer />
        <View display="flex" flexDir="row" justifyContent="center">
          <Image
            source={ProfilePic}
            width="32"
            height="32"
            borderRadius={4}
            alt="Profile Picture"
          />
        </View>
        <Spacer />
        <View justifyContent="center" alignItems="center">
          <Button width={48}>{t('userForm.takePic')}</Button>
          <Spacer />
          <Button width={48}>{t('userForm.fromDevice')}</Button>
          <Spacer />
        </View>

        <View>
          {/* First Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.name')}
              placeholder={t('profile.name')}
              defaultValue={initialValues.firstName}
              name="firstName"
              control={control}
              errors={errors}
            />
          </View>

          {/* Last Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.lastName')}
              placeholder={t('profile.lastName')}
              defaultValue={initialValues.lastName}
              name="lastName"
              control={control}
              errors={errors}
            />
          </View>

          {/* Display Name */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.displayName')}
              placeholder={t('profile.displayName')}
              defaultValue={initialValues.displayName}
              name="displayName"
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
                variant={true ? 'solid' : 'outline'}
                onPress={() =>
                  setUserProfile({
                    ...userProfile,
                    birthGender: BirthGender.MALE
                  })
                }>
                {t('userForm.male')}
              </Button>
              <Spacer h={0} />
              <Button
                variant={false ? 'solid' : 'outline'}
                onPress={() =>
                  setUserProfile({
                    ...userProfile,
                    birthGender: BirthGender.FEMALE
                  })
                }>
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
              defaultValue={initialValues.healthIssues}
              name="healthIssues"
              control={control}
              errors={errors}
            />
          </View>

          {/* Personal Medicine */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.personalMedicine')}
              placeholder={t('profile.personalMedicine')}
              defaultValue={initialValues.personalMedicine}
              name="personalMedicine"
              control={control}
              errors={errors}
            />
          </View>

          {/* Allergens */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.allergens')}
              placeholder={t('profile.allergens')}
              defaultValue={initialValues.allergens}
              name="allergens"
              control={control}
              errors={errors}
            />
          </View>

          {/* Previous Vaccinations */}
          <View style={styles.inputRow}>
            <TextInput
              label={t('profile.previousVaccinations')}
              placeholder={t('profile.previousVaccinations')}
              defaultValue={initialValues.previousVaccinations}
              name="previousVaccinations"
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
            value={userProfile?.bloodType}
            defaultValue={userProfile?.bloodType}
            onChange={(nextValue: BloodType) => {
              console.log(nextValue);
              if (setUserProfile) {
                setUserProfile({
                  ...userProfile,
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
