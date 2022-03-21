import { Platform, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import {
  Button,
  Image,
  Radio,
  ScrollView,
  Text,
  View,
  FormControl
} from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';
// import InputBox from '../components/atoms/Input';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { UserContext } from '../contexts/UserContext';
import { BloodType, User, userProfileSchema, BirthGender } from '../dto/User';
import Divider from '../components/atoms/Divider';
import { useFormik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { LANGUAGES, useSettings } from '../hooks/useSettings';
import Input from '../components/atoms/InputField';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

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

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userProfileSchema,
      onSubmit: (values) => {
        onFormSubmit(values);
      }
    });

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
            {t('55')}
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
          <Button width={48}>{t('56')}</Button>
          <Spacer />
          <Button width={48}>{t('57')}</Button>
          <Spacer />
        </View>

        <View>
          {/* First Name */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'firstName' in errors}>
              <FormControl.Label>{t('62')}</FormControl.Label>
              <Input
                onBlur={handleBlur('firstName')}
                placeholder={t('62')}
                onChangeText={handleChange('firstName')}
                value={values.firstName}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.firstName ? errors.firstName : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Last Name */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'lastName' in errors}>
              <FormControl.Label>{t('63')}</FormControl.Label>
              <Input
                onBlur={handleBlur('lastName')}
                placeholder={t('63')}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.lastName ? errors.lastName : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Display Name */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'displayName' in errors}>
              <FormControl.Label>{t('15')}</FormControl.Label>
              <Input
                onBlur={handleBlur('displayName')}
                placeholder={t('15')}
                onChangeText={handleChange('displayName')}
                value={values.displayName}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.displayName ? errors.displayName : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Gender */}
          <Text fontSize={16} mb={2}>
            {t('16')}
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
                {t('59')}
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
                {t('60')}
              </Button>
            </View>
          </View>
          <Spacer />

          {/* Birthdate */}
          <Text fontSize={16} mb={2}>
            {t('17')}
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
                <Button onPress={() => showDatepicker()}>{t('61')}</Button>
              </View>
            )}
          </View>
          <Spacer />

          {/* Health Issues */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'healthIssues' in errors}>
              <FormControl.Label>{t('19')}</FormControl.Label>
              <Input
                onBlur={handleBlur('healthIssues')}
                placeholder={t('19')}
                onChangeText={handleChange('healthIssues')}
                value={values.healthIssues}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.healthIssues ? errors.healthIssues : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Personal Medicine */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'personalMedicine' in errors}>
              <FormControl.Label>{t('20')}</FormControl.Label>
              <Input
                onBlur={handleBlur('personalMedicine')}
                placeholder={t('20')}
                onChangeText={handleChange('personalMedicine')}
                value={values.personalMedicine}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.personalMedicine ? errors.personalMedicine : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Allergens */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'allergens' in errors}>
              <FormControl.Label>{t('21')}</FormControl.Label>
              <Input
                onBlur={handleBlur('allergens')}
                placeholder={t('21')}
                onChangeText={handleChange('allergens')}
                value={values.allergens}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.allergens ? errors.allergens : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Previous Vaccinations */}
          <View style={styles.inputRow}>
            <FormControl isInvalid={'previousVaccinations' in errors}>
              <FormControl.Label>{t('22')}</FormControl.Label>
              <Input
                onBlur={handleBlur('previousVaccinations')}
                placeholder={t('22')}
                onChangeText={handleChange('previousVaccinations')}
                value={values.previousVaccinations}
              />
              <FormControl.ErrorMessage mt={0}>
                {touched.previousVaccinations
                  ? errors.previousVaccinations
                  : ''}
              </FormControl.ErrorMessage>
            </FormControl>
          </View>

          {/* Blood Type */}
          <Text fontSize={16} mb={2}>
            {t('23')}
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
          <Button w="100%" onPress={handleSubmit}>
            {t('58')}
          </Button>
          <Spacer />
          <Button
            w="100%"
            colorScheme="secondary"
            variant="outline"
            onPress={() => navigation.goBack()}>
            {t('11')}
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
