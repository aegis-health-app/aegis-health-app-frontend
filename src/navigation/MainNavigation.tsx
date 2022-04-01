import React, { useContext, useEffect, useState } from 'react';
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
import HealthRecordScreen from '../screens/healthRecord/HealthRecordScreen';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import ProfileScreen from '../screens/ProfileScreen';
import ConnectElderlyScreen from '../screens/caretakers/ConnectElderlyScreen';
import InputCodeScreen from '../screens/caretakers/InputCodeScreen';
import ConfirmConnectScreen from '../screens/caretakers/ConfirmConnectScreen';
import { useTranslation } from 'react-i18next';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { TourguideContext } from '../contexts/TourguideContext';
import { TouchableOpacity } from 'react-native';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import ChangeAccountPasswordScreen from '../screens/ChangeAccountPasswordScreen';
import ChangePhoneNumberScreen from '../screens/ChangePhoneNumberScreen';
import PlanSelectionScreen from '../screens/PlanSelectionScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePhoneNumberVerificationScreen from '../screens/ChangePhoneNumberVerificationScreen';
import { UserContext } from '../contexts/UserContext';
import CaretakerHomeScreen from './../screens/CaretakerHomeScreen';
import TakeCareElderlyScreen from './../screens/TakeCareElderlyScreen';
import CustomHealthRecordingScreen from '../screens/CustomHealthRecordingScreen';
import AddHealthEntry from '../screens/healthRecord/AddHealthEntryScreen';
import EditHealthEntryScreen from '../screens/healthRecord/EditHealthEntryScreen';
import SplashScreen from '../screens/SplashScreen';
import ElderlyEmotionHistoryScreen from './../screens/ElderlyEmotionHistoryScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();
  const { setShowSettingsTourguide } = useContext(TourguideContext);
  const { user, userToken } = useContext(UserContext);
  const [showNav, setShowNav] = useState<boolean>(true);

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FAFAFA'
    }
  };

  useEffect(() => {
    setShowNav(false);
    setTimeout(() => {
      setShowNav(true);
    }, 0);
  }, [userToken]);

  if (!showNav) return null;
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
              name="CaretakerHomeScreen"
              component={CaretakerHomeScreen}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="SettingScreen"
              component={SettingScreen}
              options={{
                headerTitle: t('home.settingButton'),
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
                headerTitle: t('profile.profile'),
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ChangeAccountPasswordScreen"
              component={ChangeAccountPasswordScreen}
              options={{
                headerTitle: t('setting.changePhoneNumber'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ChangePhoneNumberScreen"
              component={ChangePhoneNumberScreen}
              options={{
                headerTitle: t('setting.changeAccPassword'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ChangePhoneNumberVerificationScreen"
              component={ChangePhoneNumberVerificationScreen}
              options={{
                headerTitle: t('setting.changeAccPassword'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ProfileEditScreen"
              component={ProfileEditScreen}
              options={{
                headerTitle: t('userForm.editProfile'),
                headerShown: true
              }}
            />
            <Stack.Screen
              name="EditCaretakerScreen"
              component={EditCaretakerScreen}
              options={{
                title: t('profile.myCaretaker'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ConnectCaretakerScreen"
              component={ConnectCaretakerScreen}
              options={{
                title: t('userLink.headerElderly'),
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
              options={{
                title: t('modules.healthRecord'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="AddHealthEntryScreen"
              component={AddHealthEntry}
              initialParams={{ recordTitle: '' }}
              options={{
                title: t(''),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="EditHealthEntryScreen"
              component={EditHealthEntryScreen}
              initialParams={{ recordTitle: '' }}
              options={{
                title: t(''),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
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
                title: t('modules.selectModules'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                title: 'Forgot Password',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ConnectElderlyScreen"
              component={ConnectElderlyScreen}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="InputCodeScreen"
              component={InputCodeScreen}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="ConfirmConnectScreen"
              component={ConfirmConnectScreen}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="TakeCareElderlyScreen"
              component={TakeCareElderlyScreen}
              options={{
                title: t('profile.profile'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="ElderlyEmotionHistoryScreen"
              component={ElderlyEmotionHistoryScreen}
              options={{
                title: t('home.emotionHist'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="CustomHealthRecordingScreen"
              component={CustomHealthRecordingScreen}
              options={{
                title: t('healthRecording.createRecordings'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '800' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="CustomHealthRecordingScreen"
              component={CustomHealthRecordingScreen}
              options={{
                title: t('healthRecording.createRecordings'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '800' },
                headerShown: true
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignInScreen"
              component={SignInScreen}
              options={{
                title: t('auth.signIn'),
                headerShown: false,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="PlanSelectionScreen"
              component={PlanSelectionScreen}
              options={{
                title: 'Plan Selection',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PlanSelectionScreen"
              component={PlanSelectionScreen}
              options={{
                title: 'Plan Selection',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              initialParams={{ isElderly: true }}
              options={{
                title: t('auth.signUp'),
                headerShown: true,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="PlanSelectionScreen"
              component={PlanSelectionScreen}
              options={{
                title: 'Plan Selection',
                headerShown: false
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
