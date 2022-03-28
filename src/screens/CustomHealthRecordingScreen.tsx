import { Box, Button, Image, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../components/atoms/TextInput';
import * as Yup from 'yup';
import { useYupValidationResolver } from '../hooks/useYupValidationResolver';
import i18n from '../internationalization/i18n.config';
import {
  CameraPhotoOptions,
  requestCameraPermission
} from '../utils/permission';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import DataFieldInput from '../components/molecules/DataFieldInput';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const CustomHealthRecordingScreen = () => {
  const [customImage, setCustomImage] = useState<ImagePickerResponse>();
  const [fieldNumber, setFieldNumber] = useState<number>(0);
  const inputSchema = Yup.object({
    title: Yup.string().required(i18n.t('healthRecording.titleBlankError')),
    fieldName: Yup.string().required(i18n.t('healthRecording.fieldBlankError')),
    unit: Yup.string().required('')
  });

  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    watch
  } = useForm({
    resolver: useYupValidationResolver(inputSchema),
    mode: 'onTouched'
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const takePicture = async () => {
    requestCameraPermission().then(async () => {
      const result: ImagePickerResponse = await launchCamera(
        CameraPhotoOptions
      );
      setCustomImage(result);
    });
  };

  const selectPictureFromDevice = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(
      CameraPhotoOptions
    );
    setCustomImage(result);
  };

  const getImage = () => {
    if (customImage && customImage.assets)
      return { uri: customImage.assets[0].uri };
  };

  const handleImageSelected = () => {
    if (customImage !== undefined && !customImage.didCancel)
      return (
        <Image
          source={getImage()}
          width="100%"
          height={48}
          borderRadius={4}
          alt="Profile Picture"
        />
      );
    return (
      <Text fontSize={16} color="#A1A1AA">
        {t('healthRecording.noImageText')}
      </Text>
    );
  };

  return (
    <SafeAreaView edges={['left', 'top', 'right']}>
      <ScrollView>
        <View mx={4} flexDir="column">
          <View mt={4}>
            <Text fontSize={17} fontWeight="bold">
              {t('healthRecording.generalInformation')}
            </Text>
          </View>
          <View mt={3}>
            <Text fontSize={16} color="#52525B">
              {t('healthRecording.title')}
            </Text>
            <TextInput
              placeholder={t('healthRecording.title')}
              name="title"
              control={control}
              errors={errors}
            />
          </View>
          {/* Image Part */}
          <View mt={2}>
            <Text fontSize={16} color="#52525B">
              {t('healthRecording.image')}
            </Text>
          </View>
          <View mt={2}>{handleImageSelected()}</View>
          <View mt={2} flexDir="row" justifyContent="space-between">
            <Button width="48%" onPress={() => takePicture()}>
              {t('healthRecording.takeAPicture')}
            </Button>
            <Button width="48%" onPress={() => selectPictureFromDevice()}>
              {t('healthRecording.browse')}
            </Button>
          </View>
          {/* Data Field Part */}
          <View mt={4}>
            <Text fontSize={17} fontWeight="bold">
              {t('healthRecording.dataField')}
            </Text>
          </View>
          {/* Data Field Inputs Part */}
          <View>
            <DataFieldInput />
            {Array.from(Array(fieldNumber)).map((x, index) => <DataFieldInput key={index} hasX={true}/>)}
          </View>
          <View mt={6}>
            <Button
              width="100%"
              size="md"
              borderWidth="1"
              borderColor="#1D84DF"
              backgroundColor="#FAFAFA"
              _text={{ color: '#1D84DF' }}
              _pressed={{
                borderColor: '#7CC2FF',
                _text: { color: '#7CC2FF' }
              }}
              onPress={() => {
                  setFieldNumber(fieldNumber + 1)
                  console.log(fieldNumber)
              }}>
              {t('healthRecording.addField')}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomHealthRecordingScreen;
