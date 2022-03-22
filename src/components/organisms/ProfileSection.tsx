import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, Image, Icon } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';

const ProfilePic = require('../../assets/images/sompoch.png');

const ProfileSection = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View flexDir="row" justifyContent="space-between" width="100%">
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <View flexDir="row">
          <Image
            source={ProfilePic}
            width="12"
            height="12"
            borderRadius={4}
            marginRight={4}
            alt="Profile Picture"
          />
          <View>
            <Text>{t('home.userGreet')}</Text>
            <Text fontSize="xl" fontWeight="600">
              Name
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View alignItems="center" justifyContent="center">
        <Icon
          as={MaterialIcons}
          name="settings"
          size={9}
          color="muted.600"
          onPress={() => navigation.navigate('SettingScreen')}
        />
        <Text fontSize="sm">Settings</Text>
      </View>
    </View>
  );
};

export default ProfileSection;
