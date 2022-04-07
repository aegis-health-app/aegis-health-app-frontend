import { Button, Icon, Image, ScrollView, Text, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInput from '../../components/atoms/TextInput';
import * as Yup from 'yup';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import i18n from '../../internationalization/i18n.config';
import {
  CameraPhotoOptions,
  requestCameraPermission
} from '../../utils/permission';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import FallbackImage from '../../components/molecules/FallbackImage';
import Alert, { AlertType } from '../../components/organisms/Alert';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../../contexts/UserContext';
import { client } from '../../config/axiosConfig';

interface Fields {
  fieldName: string | undefined;
  unit: string | undefined;
}

interface UploadImageDTO {
  base64: string | undefined;
  name: string | undefined;
  type: string | undefined;
  size: number | undefined;
}
interface UpdateHealthRecordDTO {
  hrName: string;
  imageid?: UploadImageDTO | object;
  listField: Fields[];
}

const CustomHealthRecordingScreen = () => {
  const [customImage, setCustomImage] = useState<ImagePickerResponse>();
  const [fieldList, setFieldList] = useState<Fields[]>([
    { fieldName: undefined, unit: undefined }
  ]);
  const [showImageUploadError, setShowImageUploadError] =
    useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const inputSchema = Yup.object({
    title: Yup.string().required(i18n.t('healthRecording.titleBlankError'))
  });

  const { user } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  const {
    control,
    formState: { errors },
    watch
  } = useForm({ resolver: useYupValidationResolver(inputSchema), mode: 'all' });

  const watchInputs = watch();
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
          fallbackElement={FallbackImage}
          alt="Profile Picture"
        />
      );
    return (
      <Text fontSize={16} color="#A1A1AA">
        {t('healthRecording.noImageText')}
      </Text>
    );
  };

  const handleFieldRemove = (id: number) => {
    const list = [...fieldList];
    list.splice(id, 1);
    setFieldList(list);
  };

  const handleFieldAdd = () => {
    setFieldList([...fieldList, { fieldName: undefined, unit: undefined }]);
  };

  const handleFieldNameChange = (e: string, index: number) => {
    const list = [...fieldList];
    list[index] = { fieldName: e, unit: list[index].unit };
    setFieldList(list);
  };

  const handleUnitChange = (e: string, index: number) => {
    const list = [...fieldList];
    list[index] = { fieldName: list[index].fieldName, unit: e };
    setFieldList(list);
  };

  const handleButtonState = () => {
    if (
      watchInputs.title === '' ||
      watchInputs.title === null ||
      fieldList.filter((e) => e.fieldName === '').length > 0 ||
      fieldList.filter((e) => e.unit === '').length > 0 ||
      fieldList.filter((e) => e.fieldName === undefined).length > 0 ||
      fieldList.filter((e) => e.unit === undefined).length > 0
    )
      return true;
    return false;
  };

  const handleSubmit = async () => {
    const uploadImage = customImage
      ? customImage.assets
        ? customImage.assets[0]
        : undefined
      : undefined;

    const payload = {
      hrName: watchInputs.title, 
      imageid: uploadImage
        ? {
            base64: uploadImage.base64,
            name: uploadImage.fileName,
            type: uploadImage.type,
            size: uploadImage.fileSize
          }
        : undefined,
      listField: fieldList
    } as UpdateHealthRecordDTO 

    if (user?.isElderly) {
      try {
        await client.post('/healthRecord/add/elderly', payload);
        setShowSuccessAlert(true);
      } catch (err) {
        console.log(err);
        setShowErrorAlert(true);
      }
    }
    if (!user?.isElderly) {
      try {
        await client.post('/healthRecord/add/caretaker', payload);
        setShowSuccessAlert(true);
      } catch (err) {
        console.log(err);
        setShowErrorAlert(true);
      }
    }
  };
  return (
    <View flex={1}>
      <SafeAreaView edges={['left', 'top', 'right']}>
        <Alert
          isOpen={showImageUploadError}
          close={() => setShowImageUploadError(false)}
          type={AlertType.ERROR}
          message="addCustomHealthRecordingError"
        />
        <Alert
          isOpen={showErrorAlert}
          close={() => setShowErrorAlert(false)}
          type={AlertType.ERROR}
          message="addCustomHealthRecordingError"
        />
        <Alert
          isOpen={showSuccessAlert}
          close={() => {
            setShowSuccessAlert(false);
            // change navigation later
            if (!showImageUploadError) navigation.navigate('UserLinkScreen');
          }}
          type={AlertType.SUCCESS}
          message="addCustomHealthRecordingSuccess"
        />
        <ScrollView height="85%">
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
                isRequired
                errorMessage={t('healthRecording.titleBlankError')}
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
              {fieldList.map((field: Fields, index: number) => (
                <View key={index} flexDir="row">
                  <View mt={2} flexDir="row">
                    <View width="52.5%">
                      <Text fontSize={16} color="#52525B">
                        {t('healthRecording.fieldName')} {index + 1}{' '}
                        {field.fieldName === '' ? (
                          <Text color="red.500" fontSize="12">
                            *
                          </Text>
                        ) : null}
                      </Text>
                      <TextInput
                        placeholder={t('healthRecording.fieldName')}
                        name={`fieldName_${index}`}
                        control={control}
                        errors={errors}
                        value={field.fieldName}
                        onChangeText={(e: string) => {
                          handleFieldNameChange(e, index);
                        }}
                        onEndEditing={() =>
                          field.fieldName === undefined
                            ? handleFieldNameChange('', index)
                            : undefined
                        }
                        borderColor={
                          field.fieldName === '' ? 'red.500' : '#ACB5BD'
                        }
                      />
                      {field.fieldName === '' ? (
                        <Text color="red.500" fontSize="12">
                          {t('healthRecording.fieldBlankError')}
                        </Text>
                      ) : null}
                    </View>
                    <View ml={4} width="37.5%">
                      <Text fontSize={16} color="#52525B">
                        {t('healthRecording.unit')}{' '}
                        {field.unit === '' ? (
                          <Text color="red.500" fontSize="12">
                            *
                          </Text>
                        ) : null}
                      </Text>
                      <TextInput
                        placeholder={t('healthRecording.unit')}
                        name={`unit_${index}`}
                        control={control}
                        errors={errors}
                        value={field.unit}
                        onChangeText={(e: string) => handleUnitChange(e, index)}
                        onEndEditing={() =>
                          field.unit === undefined
                            ? handleUnitChange('', index)
                            : undefined
                        }
                        borderColor={field.unit === '' ? 'red.500' : '#ACB5BD'}
                      />
                      {field.unit === '' ? (
                        <Text color="red.500" fontSize="12">
                          {t('healthRecording.fieldBlankError')}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  {fieldList.length !== 1 ? (
                    <Icon
                      style={styles.icon}
                      ml={-2}
                      as={MaterialIcons}
                      name="close"
                      size="6"
                      color="muted.600"
                      onPress={() => {
                        handleFieldRemove(index);
                      }}
                    />
                  ) : null}
                </View>
              ))}
            </View>
            <View my={6}>
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
                  handleFieldAdd();
                }}>
                {t('healthRecording.addField')}
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {useKeyboardOpen() ? (
        <View
          bottom="0"
          height="15%"
          width="100%"
          position="absolute"
          bgColor="white">
          <Button
            isDisabled={true}
            mx={4}
            mt={3}
            onPress={() => {
              console.log({
                hrName: watchInputs.title,
                imageid: null,
                listField: fieldList
              });
            }}>
            {t('healthRecording.create')}
          </Button>
        </View>
      ) : (
        <View
          bottom="0"
          height="15%"
          width="100%"
          position="absolute"
          bgColor="white">
          <Button
            mx={4}
            mt={4}
            isDisabled={handleButtonState()}
            onPress={() => handleSubmit()}>
            {t('healthRecording.create')}
          </Button>
        </View>
      )}
    </View>
  );
};

export default CustomHealthRecordingScreen;

const styles = StyleSheet.create({
  icon: {
    marginTop: 55
  }
});
