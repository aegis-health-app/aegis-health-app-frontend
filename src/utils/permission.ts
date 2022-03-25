import { PermissionsAndroid, Platform } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

export const CameraPhotoOptions: CameraOptions = {
  mediaType: 'photo'
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Actions when permission granted
      } else {
        // Actions when permission denied
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
