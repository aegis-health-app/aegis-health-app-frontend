import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, Image, Icon } from 'native-base';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../contexts/UserContext';
import { RootStackParamList } from '../../navigation/types';
import FallbackImage from '../molecules/FallbackImage';

const ProfilePic = require('../../assets/images/defaultProfile.png');

const ProfileSection = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);

  return (
    <View
      flexDir="row"
      justifyContent="space-between"
      width="100%"
      alignItems="center">
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <View flexDir="row">
          <Image
            source={user?.imageid ? { uri: user.imageid } : ProfilePic}
            width="12"
            height="12"
            borderRadius={4}
            marginRight={4}
            fallbackElement={FallbackImage}
            alt="Profile Picture"
          />
          <View>
            <Text fontSize="xl" fontWeight="600">
              Name
            </Text>
            <Text fontSize="sm" fontWeight="400" color="gray.500">
              {t('home.profileTouchIndicator')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View alignItems="center" justifyContent="center">
        <Icon
          as={MaterialIcons}
          name="settings"
          size={8}
          color="muted.600"
          onPress={() => navigation.navigate('SettingScreen')}
        />
        <Text fontSize="sm" color="gray.500">
          {t('home.settingButton')}
        </Text>
      </View>
    </View>
  );
};

export default ProfileSection;
