/**
 * Note: The screen name and its param type are defined here.
 */

export type RootStackParamList = {
  //Authorized Screens
  TabNavigation: undefined;
  CaretakerHomeScreen: undefined;

  AuthScreen: undefined;
  SettingScreen: undefined;
  ChangeAccountPasswordScreen: undefined;
  ChangePhoneNumberScreen: undefined;
  ChangePhoneNumberVerificationScreen: { phoneNumber: string };
  ProfileScreen: undefined;
  ProfileEditScreen: undefined;
  EmergencyScreen: undefined;
  ReminderScreen: undefined;
  HealthRecordScreen: undefined;
  MemoryScreen: undefined;
  EmotionalTrackingScreen: undefined;
  EditCaretakerScreen: { info: object };
  UserLinkScreen: undefined;
  ConnectCaretakerScreen: undefined;
  HealthBlogScreen: undefined;
  ModuleManageScreen: undefined;
  ConnectElderlyScreen: undefined;
  InputCodeScreen: undefined;
  ConfirmConnectScreen: { info : object };

  SignInScreen: undefined;
  SignUpScreen: { isElderly: boolean };
  ForgotPasswordScreen: undefined;

  PlanSelectionScreen: undefined;
  // Unauthorized
  OnBoardingScreen: undefined;
};
