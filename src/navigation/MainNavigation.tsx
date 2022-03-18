import React from 'react';
import { RootStackParamList } from './types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import SettingScreen from '../screens/SettingScreen';
import EditCaretakerScreen from '../screens/EditCaretakerScreen';
import ConnectCaretakerScreen from '../screens/ConnectCaretakerScreen';
import ModulePickerScreen from '../screens/ModuleManageScreen';
import HealthBlogScreen from './../screens/HealthBlogScreen';
import EmergencyScreen from './../screens/EmergencyScreen';
import ReminderScreen from './../screens/ReminderScreen';
import MemoryPracticeScreen from '../screens/MemoryPracticeScreen';
import HealthRecordScreen from '../screens/HealthRecordScreen';
import ConnectScreen from './../screens/ConnectScreen';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from '../screens/ProfileScreen';

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
          options={{
            headerTitle: 'Settings',
            headerShown: true,
            headerRight: () => (
              <Icon as={Feather} name="help-circle" size="7" color="#F97316" />
            )
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerTitle: 'Profile',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="EditCaretakerScreen"
          component={EditCaretakerScreen}
          options={{
            title: 'ผู้ดูแลของฉัน',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 20, fontWeight: '600' }
          }}
        />
        <Stack.Screen
          name="ConnectCaretakerScreen"
          component={ConnectCaretakerScreen}
          options={{
            title: 'เชื่อมต่อกับผู้ดูแล',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 20, fontWeight: '600' }
          }}
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
            headerTitleStyle: { fontSize: 20, fontWeight: '600' }
          }}
        />
        <Stack.Screen
          name="ConnectScreen"
          component={ConnectScreen}
          options={{
            title: 'Connect',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontSize: 20, fontWeight: '600' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
