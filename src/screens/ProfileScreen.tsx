import { StyleSheet } from 'react-native';
import React from 'react';
import { Image, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import EditButton from '../components/atoms/EditButton';
import BasicProfile from '../components/molecules/BasicProfile';
import Divider from '../components/atoms/Divider';
import HealthProfile from '../components/molecules/HealthProfile';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Temporary profile image
const ProfilePic = require('../assets/images/sompochHD.png');

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // TODO: Update dummy data to use the fetched data
  const basicProfiledata = [
    {
      label: t('profile.name'),
      value: 'Sompoch Muangyim'
    },
    {
      label: t('profile.displayName'),
      value: 'sompoch'
    },
    {
      label: t('profile.birthGender'),
      value: 'Male'
    },
    {
      label: t('profile.birthDate'),
      value: '08/02/1951'
    },
    {
      label: t('profile.phoneNumber'),
      value: '0909090909'
    }
  ];

  // TODO: Update dummy data to use the fetched datad
  const healthProfileData = [
    {
      label: t('profile.healthIssues'),
      value: 'Diebetes, High blood pressure'
    },
    {
      label: t('profile.personalMedicine'),
      value: 'Ibuprofen'
    },
    {
      label: t('profile.allergens'),
      value: 'Chlorpheniramine เกสรดอกไม้'
    },
    {
      label: t('profile.previousVaccinations'),
      value: 'บาดทะยัก คอตีบ'
    },
    {
      label: t('profile.bloodType'),
      value: 'B'
    }
  ];

  return (
    <View style={styles.pageContainer}>
      <View style={styles.profileInfoItemRow}>
        <Text fontSize="2xl" fontWeight="700">
          {t('profile.details')}
        </Text>
        <EditButton onPress={() => navigation.navigate('ProfileEditScreen')} />
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
      <BasicProfile data={basicProfiledata} />
      <Divider />
      <HealthProfile data={healthProfileData} />
      <Spacer />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  profileInfoItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
