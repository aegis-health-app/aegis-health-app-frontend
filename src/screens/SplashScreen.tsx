import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Center, Image, View } from 'native-base';
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { RootStackParamList } from '../navigation/types';

const aegisLogo = require('../assets/images/aegis_logo.png');

const SplashScreen = () => {
  const { user, userToken } = useContext(UserContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useAsyncEffect(async () => {
    const viewed = await AsyncStorage.getItem('viewedOnboarding');
    console.log(!viewed);
    if (!viewed) {
      navigation.replace('OnBoardingScreen');
      return;
    }

    if (userToken && !user) {
      navigation.replace('SignInScreen');
      return;
    } else if (!userToken) {
      navigation.replace('SignInScreen');
      return;
    }
    if (userToken && user && user.isElderly)
      navigation.replace('TabNavigation');
    else navigation.replace('CaretakerHomeScreen');
  }, [user]);

  return (
    <View flex={1} justifyContent="center">
      <Center>
        <Image source={aegisLogo} height="12" width="24" />
      </Center>
    </View>
  );
};

export default SplashScreen;
