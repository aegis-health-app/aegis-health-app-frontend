/**
 * Note: The screen name and its param type are defined here.
 */

export type RootStackParamList = {
  //Authorized Screens
  TabNavigation: undefined;

  AuthScreen: undefined;
  SettingScreen: undefined;
  ChangeAccountPasswordScreen: undefined;
  ChangePhoneNumberScreen: undefined;
  ChangePhoneNumberVerificationScreen: undefined;
  ProfileScreen: undefined;
  ProfileEditScreen: undefined;
  EmergencyScreen: undefined;
  ReminderScreen: undefined;
  HealthRecordScreen: undefined;
  MemoryScreen: undefined;
  EmotionalTrackingScreen: undefined;
  EditCaretakerScreen: { itemId: string };
  UserLinkScreen: undefined;
  ConnectCaretakerScreen: undefined;
  HealthBlogScreen: undefined;
  ModuleManageScreen: undefined;
  ConnectElderlyScreen: undefined;
  InputCodeScreen: undefined;
  ConfirmConnectScreen: undefined;

  ConnectScreen: undefined;

  SignInScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;

  PlanSelectionScreen: undefined;
  // Unauthorized
  OnBoardingScreen: undefined;
};
