import { Button, Image, View } from 'native-base';
import React, { useState } from 'react';
import Spacer from '../atoms/Spacer';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse
} from 'react-native-image-picker';
import {
  CameraPhotoOptions,
  requestCameraPermission
} from '../../utils/permission';
import images from '../../assets/images';
import { useTranslation } from 'react-i18next';

const PictureSelection: React.FC = () => {
  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();

  const takePicture = async () => {
    requestCameraPermission().then(async () => {
      const result: ImagePickerResponse = await launchCamera(
        CameraPhotoOptions
      );
      setNewProfileImage(result);
    });
  };

  const selectPictureFromDevice = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(
      CameraPhotoOptions
    );
    setNewProfileImage(result);
  };

  const { t } = useTranslation();

  return (
    <>
      <View display="flex" flexDir="row" justifyContent="center">
        <Image
          source={
            newProfileImage && newProfileImage.assets
              ? { uri: newProfileImage.assets[0].uri }
              : images.picturePlaceholder
          }
          width="32"
          height="32"
          borderRadius={4}
          alt="Profile Picture"
        />
      </View>
      <Spacer />
      <View justifyContent="center" alignItems="center">
        <Button width={48} onPress={() => takePicture()}>
          {t('userForm.takePic')}
        </Button>
        <Spacer />
        <Button width={48} onPress={() => selectPictureFromDevice()}>
          {t('userForm.fromDevice')}
        </Button>
        <Spacer />
      </View>
    </>
  );
};

export default PictureSelection;
