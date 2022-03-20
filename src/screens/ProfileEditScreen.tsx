import { StyleSheet } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { Button, Image, Radio, ScrollView, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';
import InputBox from '../components/atoms/Input';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { UserContext } from '../contexts/UserContext';
import { BloodType } from '../dto/User';
import Divider from '../components/atoms/Divider';
import DateTimePicker from 'react-native-modal-datetime-picker';

// Temporary profile image
const ProfilePic = require('../assets/images/sompochHD.png');

const ProfileEditScreen = () => {
  const { t } = useTranslation();
  const { userProfile, setUserProfile } = useContext(UserContext);
  const bloodTypeRef = useRef(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    hideDateTimePicker();
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
          {/* Name */}
          <InputBox name={t('14')} />

          {/* Display Name */}
          <InputBox name={t('15')} />

          {/* Gender */}
          <Text fontSize={16} mb={2}>
            {t('16')}
          </Text>
          <View style={styles.profileInfoItemRow}>
            <View style={styles.toggleButtonsContainer}>
              <Button variant={true ? 'solid' : 'outline'} onPress={() => null}>
                {t('59')}
              </Button>
              <Spacer h={0} />
              <Button
                variant={false ? 'solid' : 'outline'}
                onPress={() => null}>
                {t('60')}
              </Button>
            </View>
          </View>
          <Spacer />

          {/* Birthdate */}
          <Text fontSize={16} mb={2}>
            {t('17')}
          </Text>
          <View style={styles.profileInfoItemRow}>
            <Text fontSize="md">Test</Text>
            <Button onPress={() => showDateTimePicker()}>{t('61')}</Button>
          </View>
          <Spacer />
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
          />

          {/* Phone Number */}
          <InputBox name={t('18')} />

          {/* Health Issues */}
          <InputBox name={t('19')} />

          {/* Personal Medicine */}
          <InputBox name={t('20')} />

          {/* Allergens */}
          <InputBox name={t('21')} />

          {/* Previous Vaccinations */}
          <InputBox name={t('22')} />

          {/* Blood Type */}
          <Text fontSize={16} mb={2}>
            {t('23')}
          </Text>
          <Radio.Group
            ref={bloodTypeRef}
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
          <Button w="100%">{t('58')}</Button>
          <Spacer />
          <Button w="100%" colorScheme="secondary" variant="outline">
            {t('11')}
          </Button>
          <Spacer />
        </View>
        <Text>{JSON.stringify(userProfile)}</Text>
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
  }
});
