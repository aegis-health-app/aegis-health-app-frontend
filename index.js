/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'NativeBase:',
  'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format'
]);
AppRegistry.registerComponent(appName, () => App);
