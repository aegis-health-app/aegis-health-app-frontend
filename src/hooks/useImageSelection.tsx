import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import {
  CameraPhotoOptions,
  requestCameraPermission
} from '../utils/permission';

export const useImageSelection = () => {
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
