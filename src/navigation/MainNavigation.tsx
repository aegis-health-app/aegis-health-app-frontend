import React from 'react';
import { StyleSheet } from 'react-native';
import { RootStackParamList } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import SettingScreen from '../screens/SettingScreen';
import ModulePickerScreen from '../screens/ModuleManageScreen';
import HealthBlogScreen from './../screens/HealthBlogScreen';
import EmergencyScreen from './../screens/EmergencyScreen';
import ReminderScreen from './../screens/ReminderScreen';
import MemoryPracticeScreen from '../screens/MemoryPracticeScreen';
import HealthRecordScreen from '../screens/HealthRecordScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FAFAFA'
    }
  };

  return (
    <NavigationContainer theme={navigationTheme}>
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
        <Stack.Screen
          name="EmergencyScreen"
          component={EmergencyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReminderScreen"
          component={ReminderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MemoryScreen"
          component={MemoryPracticeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthRecordScreen"
          component={HealthRecordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HealthBlogScreen"
          component={HealthBlogScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ModuleManageScreen"
          component={ModulePickerScreen}
          options={{
            title: 'Select Modules',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 20, fontWeight: '700' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({
  screenHeader: {
    textAlign: 'center'
  }
});
