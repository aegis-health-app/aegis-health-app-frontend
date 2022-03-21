import React, { useState, useContext } from 'react';
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
import { useTranslation } from 'react-i18next';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { TourguideContext } from '../contexts/TourguideContext';
import { TouchableOpacity } from 'react-native';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import LandingScreen from '../screens/LandingScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();
  const { setShowSettingsTourguide } = useContext(TourguideContext);

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FAFAFA'
    }
  };

  const [user, setUser] = useState(null);

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SettingScreen"
              component={SettingScreen}
              options={{
                headerTitle: t('2'),
                headerShown: true,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => setShowSettingsTourguide(true)}>
                    <Icon
                      as={Feather}
                      name="help-circle"
                      size="7"
                      color="#F97316"
                    />
                  </TouchableOpacity>
                )
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerTitle: t('24'),
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ProfileEditScreen"
              component={ProfileEditScreen}
              options={{
                headerTitle: t('54'),
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
                title: t('43'),
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
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                title: 'Sign In',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                title: 'Sign Up',
                headerShown: false
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LandingScreen"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
