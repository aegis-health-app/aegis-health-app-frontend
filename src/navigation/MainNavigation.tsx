import React, { useContext } from 'react';
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
import MemoryRecallScreen from '../screens/MemoryRecallScreen';
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
import CustomHealthRecordingScreen from '../screens/healthRecord/CustomHealthRecordingScreen';
import AddHealthEntry from '../screens/healthRecord/AddHealthEntryScreen';
import EditHealthEntryScreen from '../screens/healthRecord/EditHealthEntryScreen';
import SplashScreen from '../screens/SplashScreen';
import ElderlyEmotionHistoryScreen from './../screens/ElderlyEmotionHistoryScreen';
import HealthRecordingsScreen from '../screens/HealthRecordingsScreen';
import CreateHealthRecordingsScreen from '../screens/CreateHealthRecordingsScreen';
import HealthRecordAnalyticsScreen from '../screens/healthRecord/HealthRecordAnalyticsScreen';
import ViewQuestionPoolScreen from '../screens/ViewQuestionPoolScreen';
import ViewAssignedQuestionsScreen from '../screens/ViewAssignedQuestionsScreen';
import ViewHistoryScreen from '../screens/ViewHistoryScreen';
import ViewHistoryDetailsScreen from '../screens/ViewHistoryDetailsScreen';
import MemoryRecallQuestionScreen from '../screens/MemoryRecallQuestionScreen';
import EmergencyInfoScreen from '../screens/EmergencyInfoScreen';
import withEmergency from '../screens/WithEmergency';
import CreateReminderScreen from '../screens/reminder/CreateReminderScreen';
import EditReminderScreen from '../screens/reminder/EditReminderScreen';
import CreateMemoryRecallQuestionsScreen from './../screens/CreateMemoryRecallQuestionsScreen';
import QuestionPoolScreen from '../screens/QuestionPoolScreen';
import EditMemoryRecallQuestionsScreen from '../screens/EditMemoryRecallQuestionScreen';
import RemindersScreen from '../screens/reminder/RemindersScreen';
import RemindersCompletedScreen from '../screens/reminder/RemindersCompletedScreen';
import MemoryRecallFinishScreen from '../screens/MemoryRecallFinishScreen';
import ReminderInfoScreen from '../screens/reminder/ReminderInfoScreen';

const MainNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();
  const {
    setShowSettingsTourguide,
    setShowHealthRecordingsTourguide,
    setShowMemoryPracticeQuestionsTourguide,
    setShowRemindersTourguide,
    setShowMemoryRecallTourguide
  } = useContext(TourguideContext);
  const { user } = useContext(UserContext);

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
        {user ? (
          <>
            {user?.isElderly ? (
              <Stack.Screen
                name="TabNavigation"
                component={withEmergency(TabNavigation)}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="CaretakerHomeScreen"
                component={withEmergency(CaretakerHomeScreen)}
                options={{
                  headerShown: false
                }}
              />
            )}
            <Stack.Screen
              name="SettingScreen"
              component={withEmergency(SettingScreen)}
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
              component={withEmergency(ProfileScreen)}
              options={{
                headerTitle: t('profile.profile'),
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ChangeAccountPasswordScreen"
              component={withEmergency(ChangeAccountPasswordScreen)}
              options={{
                headerTitle: t('setting.changePhoneNumber'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ChangePhoneNumberScreen"
              component={withEmergency(ChangePhoneNumberScreen)}
              options={{
                headerTitle: t('setting.changeAccPassword'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ChangePhoneNumberVerificationScreen"
              component={withEmergency(ChangePhoneNumberVerificationScreen)}
              options={{
                headerTitle: t('setting.changeAccPassword'),
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ProfileEditScreen"
              component={withEmergency(ProfileEditScreen)}
              options={{
                headerTitle: t('userForm.editProfile'),
                headerShown: true
              }}
            />
            <Stack.Screen
              name="EditCaretakerScreen"
              component={withEmergency(EditCaretakerScreen)}
              options={{
                title: t('profile.myCaretaker'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ConnectCaretakerScreen"
              component={withEmergency(ConnectCaretakerScreen)}
              options={{
                title: t('userLink.headerElderly'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="EmergencyScreen"
              component={EmergencyScreen}
              options={{
                title: t('emergency.header')
              }}
            />
            <Stack.Screen
              name="RemindersScreen"
              component={withEmergency(RemindersScreen)}
              options={{
                title: t('reminders.remindersHeader'),
                headerShown: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => setShowRemindersTourguide(true)}>
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
              name="RemindersCompletedScreen"
              component={withEmergency(RemindersCompletedScreen)}
              options={{
                title: t('reminders.completedHeader')
              }}
            />
            <Stack.Screen
              name="MemoryScreen"
              component={withEmergency(MemoryRecallScreen)}
              options={{
                title: t('memoryRecallElderly.memoryRecall'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => setShowMemoryRecallTourguide(true)}>
                    <Icon
                      as={Feather}
                      name="help-circle"
                      size="7"
                      color="#F97316"
                      mr="4"
                    />
                  </TouchableOpacity>
                )
              }}
            />
            <Stack.Screen
              name="MemoryRecallQuestionScreen"
              component={withEmergency(MemoryRecallQuestionScreen)}
              options={{
                title: t('memoryRecallElderly.memoryRecall'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="MemoryRecallFinishScreen"
              component={withEmergency(MemoryRecallFinishScreen)}
              options={{
                title: 'Complete!',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: false
              }}
            />
            <Stack.Screen
              name="AddHealthEntryScreen"
              component={withEmergency(AddHealthEntry)}
              options={{
                title: t(''),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="EditHealthEntryScreen"
              component={withEmergency(EditHealthEntryScreen)}
              options={{
                title: t(''),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="HealthBlogScreen"
              component={withEmergency(HealthBlogScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ModuleManageScreen"
              component={withEmergency(ModulePickerScreen)}
              options={{
                title: t('modules.selectModules'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={withEmergency(ForgotPasswordScreen)}
              options={{
                title: 'Forgot Password',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ConnectElderlyScreen"
              component={withEmergency(ConnectElderlyScreen)}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="InputCodeScreen"
              component={withEmergency(InputCodeScreen)}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="ConfirmConnectScreen"
              component={withEmergency(ConfirmConnectScreen)}
              options={{
                title: t('userLink.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="TakeCareElderlyScreen"
              component={withEmergency(TakeCareElderlyScreen)}
              options={{
                title: t('profile.profile'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="ElderlyEmotionHistoryScreen"
              component={withEmergency(ElderlyEmotionHistoryScreen)}
              options={{
                title: t('home.emotionHist'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="HealthRecordingsScreen"
              component={withEmergency(HealthRecordingsScreen)}
              options={{
                title: t('healthRecordings.header'),
                headerShown: true,
                headerShadowVisible: false,
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => setShowHealthRecordingsTourguide(true)}>
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
              name="CreateHealthRecordingsScreen"
              component={withEmergency(CreateHealthRecordingsScreen)}
              options={{
                title: t('healthRecordingsCreate.header'),
                headerShown: true,
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' }
              }}
            />
            <Stack.Screen
              name="CustomHealthRecordingScreen"
              component={withEmergency(CustomHealthRecordingScreen)}
              options={{
                title: t('healthRecording.createRecordings'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="HealthRecordAnalyticsScreen"
              component={withEmergency(HealthRecordAnalyticsScreen)}
              options={{
                title: t('healthRecording.analytics'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '800' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="EmergencyInfoScreen"
              component={withEmergency(EmergencyInfoScreen)}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewQuestionPoolScreen"
              component={withEmergency(ViewQuestionPoolScreen)}
              options={{
                title: t('viewQuestionPool.questionPool'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ViewAssignedQuestionsScreen"
              component={withEmergency(ViewAssignedQuestionsScreen)}
              options={{
                title: t('viewAssignedQuestions.memoryPractice'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() =>
                      setShowMemoryPracticeQuestionsTourguide(true)
                    }>
                    <Icon
                      as={Feather}
                      name="help-circle"
                      size="7"
                      color="#F97316"
                      mr="4"
                    />
                  </TouchableOpacity>
                )
              }}
            />
            <Stack.Screen
              name="ViewHistoryScreen"
              component={withEmergency(ViewHistoryScreen)}
              options={{
                title: t('viewHistory.analytic'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ViewHistoryDetailsScreen"
              component={withEmergency(ViewHistoryDetailsScreen)}
              options={{
                title: t('viewHistory.result'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="CreateReminderScreen"
              component={withEmergency(CreateReminderScreen)}
              options={{
                title: t('reminder.createReminder'),
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="QuestionPoolScreen"
              component={withEmergency(QuestionPoolScreen)}
              options={{
                title: t('createMemoryRecall.questionPool'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="EditReminderScreen"
              component={withEmergency(EditReminderScreen)}
              options={{
                title: t('reminder.editReminder'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="ReminderInfoScreen"
              component={withEmergency(ReminderInfoScreen)}
              options={{
                title: t('reminder.reminderInfo'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="CreateMemoryRecallQuestionsScreen"
              component={withEmergency(CreateMemoryRecallQuestionsScreen)}
              options={{
                title: t('createMemoryRecall.header'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
                headerShown: true
              }}
            />
            <Stack.Screen
              name="EditMemoryRecallQuestionsScreen"
              component={withEmergency(EditMemoryRecallQuestionsScreen)}
              options={{
                title: t('createMemoryRecall.editMemoryScreen'),
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 20, fontWeight: '600' },
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
              name="SignInScreen"
              component={SignInScreen}
              options={{
                title: t('auth.signIn'),
                headerShown: false,
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              initialParams={{ isElderly: true }}
              options={{
                title: t('auth.signUp'),
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
              name="ForgotPasswordScreen"
              component={withEmergency(ForgotPasswordScreen)}
              options={{
                title: 'Forgot Password',
                headerShown: false
              }}
            />
            <Stack.Screen
              name="OnBoardingScreen"
              component={OnBoardingScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
