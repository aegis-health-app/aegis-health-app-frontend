import { Platform, Linking } from 'react-native';

export const openDialScreen = (phone) => {
  let number;
  if (Platform.OS === 'ios') {
    number = `telprompt:${phone}`;
  } else {
    number = `tel:${phone}`;
  }
  Linking.openURL(number);
};
