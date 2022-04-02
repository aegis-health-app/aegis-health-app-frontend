import { PermissionsAndroid, Platform } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';
import i18n from '../internationalization/i18n.config';

export const CameraPhotoOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true
};

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: i18n.t('cameraPermissions.title'),
          message: i18n.t('cameraPermissions.message'),
          buttonNeutral: i18n.t('cameraPermissions.buttonNeutral'),
          buttonNegative: i18n.t('cameraPermissions.buttonNegative'),
          buttonPositive: i18n.t('cameraPermissions.buttonPositive')
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
