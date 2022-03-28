import { StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import EditButton from '../components/atoms/EditButton';
import BasicProfile from '../components/molecules/BasicProfile';
import Divider from '../components/atoms/Divider';
import HealthProfile from '../components/molecules/HealthProfile';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../contexts/UserContext';
import { ProfileItem } from '../interfaces/User';
import { getFormattedDate } from '../utils/getFormattedDate';
import { useSettings } from '../hooks/useSettings';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { language } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);

  const [basicProfile, setBasicProfile] = useState<ProfileItem[]>([]);
  const [healthProfile, setHealthProfile] = useState<ProfileItem[]>([]);

  useEffect(() => {
    if (!user) return;
    setBasicProfile([
      {
        label: t('profile.name'),
        value: `${user.fname} ${user.lname}`
      },
      {
        label: t('profile.displayName'),
        value: user.dname
      },
      {
        label: t('profile.birthGender'),
        value: user.gender
      },
      {
        label: t('profile.birthDate'),
        value: getFormattedDate(new Date(user.bday), language)
      },
      {
        label: t('profile.phoneNumber'),
        value: user.phone ?? ''
      }
    ]);
    setHealthProfile([
      {
        label: t('profile.healthIssues'),
        value: user.healthCondition ?? ''
      },
      {
        label: t('profile.personalMedicine'),
        value: user.personalMedication ?? ''
      },
      {
        label: t('profile.allergens'),
        value: user.allergy ?? ''
      },
      {
        label: t('profile.previousVaccinations'),
        value: user.vaccine ?? ''
      },
      {
        label: t('profile.bloodType'),
        value: user.bloodType ?? 'N/A'
      }
    ]);
  }, [user]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.profileInfoItemRow}>
        <Text fontSize="2xl" fontWeight="700">
          {t('profile.details')}
        </Text>
        <EditButton onPress={() => navigation.navigate('ProfileEditScreen')} />
      </View>

      <Spacer />
      <BasicProfile data={basicProfile} />
      <Divider />
      <HealthProfile data={healthProfile} />
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
