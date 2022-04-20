import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Center, Image, View } from 'native-base';
import React from 'react';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { RootStackParamList } from '../navigation/types';
import { getUser } from '../utils/user/user';

const aegisLogo = require('../assets/images/aegis_logo.png');

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useAsyncEffect(async () => {
    const viewed = await AsyncStorage.getItem('viewedOnboarding');
    if (!viewed) {
      navigation.replace('OnBoardingScreen');
      return;
    }
    try {
      const _user = await getUser();
      if (!_user) {
        navigation.replace('SignInScreen');
        return;
      }
    } catch (error) {
      navigation.replace('SignInScreen');
      return;
    }
  }, []);

  return (
    <View flex={1} justifyContent="center">
      <Center>
        <Image source={aegisLogo} height="12" width="24" alt="Aegis Logo" />
      </Center>
    </View>
  );
};

export default SplashScreen;
