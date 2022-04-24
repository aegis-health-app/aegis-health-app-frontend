import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { CameraPhotoOptions, usePermission } from '../utils/usePermission';

export const useImageSelection = () => {
  const { requestCameraPermission } = usePermission();

  const takePicture = async (
    onComplete: (result: ImagePickerResponse) => void
  ) => {
    requestCameraPermission().then(async () => {
      const result: ImagePickerResponse = await launchCamera(
        CameraPhotoOptions
      );
      onComplete(result);
    });
  };

  const selectPictureFromDevice = async (
    onComplete: (result: ImagePickerResponse) => void
  ) => {
    const result: ImagePickerResponse = await launchImageLibrary(
      CameraPhotoOptions
    );
    onComplete(result);
  };

  return { takePicture, selectPictureFromDevice };
};
