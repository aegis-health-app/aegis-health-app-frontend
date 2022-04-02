import { StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import EditButton from '../components/atoms/EditButton';
import BasicProfile, {
  BasicProfileMode
} from '../components/molecules/BasicProfile';
import Divider from '../components/atoms/Divider';
import HealthProfile from '../components/molecules/HealthProfile';
import { useTranslation } from 'react-i18next';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProfileInfo } from '../hooks/useProfileInfo';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { basicProfile, healthProfile } = useProfileInfo();
  const [showProfile, setShowProfile] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setShowProfile(false);
      setTimeout(() => {
        setShowProfile(true);
      }, 0);
    }, [])
  );

  if (!showProfile) return null;
  return (
    <View style={styles.pageContainer}>
      <View style={styles.profileInfoItemRow}>
        <Text fontSize="2xl" fontWeight="700">
          {t('profile.details')}
        </Text>
        <EditButton onPress={() => navigation.navigate('ProfileEditScreen')} />
      </View>

      <Spacer />
      <BasicProfile data={basicProfile} mode={BasicProfileMode.SELF} />
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
