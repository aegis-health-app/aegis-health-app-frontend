import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, Image, Icon } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../navigation/types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ProfilePic = require('../../assets/images/sompoch.png');

const ProfileSection = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View flexDir="row" justifyContent="space-between" width="100%">
      <View flexDir="row">
        <Image
          source={ProfilePic}
          width="16"
          height="16"
          borderRadius={4}
          marginRight={6}
          alt="Profile Picture"
        />
        <View>
          <Text>Good Morning,</Text>
          <Text fontSize="2xl" fontWeight="600">
            Name
          </Text>
        </View>
      </View>
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
