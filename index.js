/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import { handleBackgroundMessage } from './src/utils/user/notification';

LogBox.ignoreLogs([
  'NativeBase:',
  'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format'
]);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  handleBackgroundMessage(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
