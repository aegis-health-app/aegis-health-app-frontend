import { useTranslation } from 'react-i18next';
import { PermissionsAndroid, Platform } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

export const CameraPhotoOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true
};

export const usePermission = () => {
  const { t } = useTranslation();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: t('cameraPermissions.title'),
            message: t('cameraPermissions.message'),
            buttonNeutral: t('cameraPermissions.buttonNeutral'),
            buttonNegative: t('cameraPermissions.buttonNegative'),
            buttonPositive: t('cameraPermissions.buttonPositive')
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
            title: t('locationPermissions.title'),
            message: t('locationPermissions.message'),
            buttonNeutral: t('locationPermissions.buttonNeutral'),
            buttonNegative: t('locationPermissions.buttonNegative'),
            buttonPositive: t('locationPermissions.buttonPositive')
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
