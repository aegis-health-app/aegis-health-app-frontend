import { Button, Image, View } from 'native-base';
import React, { useMemo, useState } from 'react';
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

interface PictureSelectionProps {
  isIndependent?: boolean;
  dependentImage?: ImagePickerResponse;
  setDependentImage?: React.Dispatch<
    React.SetStateAction<ImagePickerResponse | undefined>
  >;
}

const PictureSelection: React.FC<PictureSelectionProps> = ({
  isIndependent = true,
  dependentImage,
  setDependentImage
}) => {
  const [newProfileImage, setNewProfileImage] = useState<ImagePickerResponse>();

  const takePicture = async () => {
    try {
      await requestCameraPermission();
      const result = await launchCamera(CameraPhotoOptions);
      if (isIndependent) {
        setNewProfileImage(result);
      } else if (setDependentImage) {
        setDependentImage(result);
      }
    } catch (err) {
      // error handling
    }
  };

  const selectPictureFromDevice = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(
      CameraPhotoOptions
    );
    if (isIndependent) {
      setNewProfileImage(result);
    } else if (setDependentImage) {
      setDependentImage(result);
    }
  };

  const { t } = useTranslation();

  const profileImage = useMemo(() => {
    if (isIndependent && newProfileImage && newProfileImage.assets)
      return { uri: newProfileImage.assets[0].uri };
    if (!isIndependent && dependentImage && dependentImage.assets)
      return { uri: dependentImage.assets[0].uri };
    return images.picturePlaceholder;
  }, [isIndependent, newProfileImage, dependentImage, images]);

  return (
    <>
      <View display="flex" flexDir="row" justifyContent="center">
        <Image
          source={profileImage}
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
