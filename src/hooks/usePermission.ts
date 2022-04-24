import { PermissionsAndroid, Platform } from 'react-native';

import { CameraOptions } from 'react-native-image-picker';
import i18n from '../internationalization/i18n.config';

export const CameraPhotoOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true
};

export const usePermission = () => {
  const requestCameraPermission = async () => {
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

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: i18n.t('locationPermissions.title'),
            message: i18n.t('locationPermissions.message'),
            buttonNeutral: i18n.t('locationPermissions.buttonNeutral'),
            buttonNegative: i18n.t('locationPermissions.buttonNegative'),
            buttonPositive: i18n.t('locationPermissions.buttonPositive')
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          return granted;
        } else {
          console.log('location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return { requestCameraPermission, requestLocationPermission };
};
