import { ElderlyLinkResponse } from './../dto/modules/modules.dto';
import { QuestionInfo } from './../dto/modules/memoryRecall';
import { CaretakerInfoView, ReminderInfo } from '../dto/modules/user.dto';
import { EmergencyInfo } from '../screens/EmergencyInfoScreen';

/**
 * Note: The screen name and its param type are defined here.
 */

export type RootStackParamList = {
  //Authorized Screens
  TabNavigation: undefined;
  CaretakerHomeScreen: undefined;
  SplashScreen: undefined;
  AuthScreen: undefined;
  SettingScreen: undefined;
  ChangeAccountPasswordScreen: undefined;
  ChangePhoneNumberScreen: undefined;
  ChangePhoneNumberVerificationScreen: {
    phoneNumber: string;
    otpToken: string;
    setOtpToken: (val: string) => void;
  };
  ProfileScreen: undefined;
  ProfileEditScreen: undefined;
  EmergencyScreen: undefined;
  EmergencyInfoScreen: { info: EmergencyInfo };
  ReminderScreen: undefined;
  RemindersScreen: undefined;
  AddHealthEntryScreen: undefined;
  EditHealthEntryScreen: undefined;
  MemoryScreen: undefined;
  EmotionalTrackingScreen: undefined;
  EditCaretakerScreen: { info: CaretakerInfoView };
  UserLinkScreen: undefined;
  ConnectCaretakerScreen: undefined;
  HealthBlogScreen: undefined;
  ModuleManageScreen: undefined;
  ConnectElderlyScreen: undefined;
  InputCodeScreen: undefined;
  ConfirmConnectScreen: { info: ElderlyLinkResponse };
  TakeCareElderlyScreen: undefined;
  CustomHealthRecordingScreen: undefined;
  ElderlyEmotionHistoryScreen: { uid: number };
  ElderlyEmotionHistory: undefined;
  HealthRecordingsScreen: undefined;
  CreateHealthRecordingsScreen: undefined;
  CreateMemoryRecallQuestionsScreen:
    | { questionInfo: QuestionInfo }
    | { question: string };
  EditMemoryRecallQuestionsScreen: { data: QuestionInfo };
  QuestionPoolScreen: undefined;

  SignInScreen: undefined;
  SignUpScreen: { isElderly: boolean };
  ForgotPasswordScreen: undefined;

  PlanSelectionScreen: undefined;
  // Unauthorized
  OnBoardingScreen: undefined;
  HealthRecordAnalyticsScreen: undefined;

  ViewQuestionPoolScreen: undefined;
  ViewAssignedQuestionsScreen: undefined;
  ViewHistoryScreen: undefined;
  ViewHistoryDetailsScreen: { timestamp: string };

  CreateReminderScreen: undefined;
  EditReminderScreen: { info: ReminderInfo };
};
