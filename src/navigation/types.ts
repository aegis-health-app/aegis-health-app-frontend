/**
 * Note: The screen name and its param type are defined here.
 */

export type RootStackParamList = {
  //Authorized Screens
  TabNavigation: undefined;

  AuthScreen: undefined;
  SettingScreen: undefined;
  ProfileScreen: undefined;
  ProfileEditScreen: undefined;
  EmergencyScreen: undefined;
  ReminderScreen: undefined;
  HealthRecordScreen: undefined;
  MemoryScreen: undefined;
  EmotionalTrackingScreen: undefined;
  EditCaretakerScreen: {itemId: string};
  UserLinkScreen: undefined;
  ConnectCaretakerScreen: undefined;
  HealthBlogScreen: undefined;
  ModuleManageScreen: undefined;
  ConnectScreen: undefined;

  SignInScreen: undefined;
  SignUpScreen: undefined;
  // Unauthorized
  OnBoardingScreen: undefined;
};
