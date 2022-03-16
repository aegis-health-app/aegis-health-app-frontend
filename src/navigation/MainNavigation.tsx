import React from 'react';
import { RootStackParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import SettingScreen from '../screens/SettingScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingScreen"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
