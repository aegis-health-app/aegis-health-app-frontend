import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, Image, Icon } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';
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
          <Text fontSize="2xl" bold>
            Name
          </Text>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate('SettingScreen')}>
        <View alignItems="center">
          <Icon as={MaterialIcons} name="settings" size={8} color="muted.600" />
          <Text fontSize="md">Settings</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProfileSection;
