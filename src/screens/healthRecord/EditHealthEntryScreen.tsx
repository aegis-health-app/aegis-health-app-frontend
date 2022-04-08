import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import moment from 'moment';
import { Button, Image, ScrollView, Text, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImagePickerResponse } from 'react-native-image-picker';
import Spacer from '../../components/atoms/Spacer';
import Alert, { AlertType } from '../../components/organisms/Alert';
import { client } from '../../config/axiosConfig';
import { HealthRecordContext } from '../../contexts/HealthRecordContext';
import { UserContext } from '../../contexts/UserContext';
import useDimensions from '../../hooks/useDimensions';
import { useImageSelection } from '../../hooks/useImageSelection';
import { RootStackParamList } from '../../navigation/types';
import HealthDataTable, { TableMode } from './HealthDataTable';

const tempHealthRecordCover = require('../../assets/images/profile.png');

const EditHealthEntryScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'EditHealthEntryScreen'>) => {
  const { recordTitle } = route.params;
  const { user } = useContext(UserContext);
  const { getHealthRecordTable, healthTable } = useContext(HealthRecordContext);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleSubmit } = useForm({ mode: 'onTouched' });
  const { ScreenWidth } = useDimensions();
  const { takePicture, selectPictureFromDevice } = useImageSelection();

  // states
  const [newHealthRecordCover, setNewHealthRecordCover] =
    useState<ImagePickerResponse>();
  const [showFailedDeleteRow, setShowFailedDeleteRow] = useState(false);
  const [showFailedDeleteRecord, setShowFailedDeleteRecord] = useState(false);
  const [showDeleteRowConfirm, setShowDeleteRowConfirm] = useState(false);
  const [showDeleteRecordConfirm, setShowDeleteRecordConfirm] = useState(false);
  const [showSuccessImageUpdate, setShowSuccessImageUpdate] = useState(false);
  const [showFailedImageUpdate, setShowFailedImageUpdate] = useState(false);
  const [tempDatetime, setTempDatetime] = useState<string>();

  const getImage = () => {
    if (newHealthRecordCover && newHealthRecordCover.assets)
      return { uri: newHealthRecordCover.assets[0].uri };
    // TODO: Update with initial image when available
    // if (user?.imageid) return { uri: user.imageid };
    return tempHealthRecordCover;
  };

  const deleteHealthRecord = async () => {
    if (!user) return;
    // TODO: Delete health record
    // temporary values
    const _hrname = 'ความดัน';

    try {
      await client.delete(
        `/healthRecord/delete/${
          user?.isElderly ? 'elderly' : 'caretaker'
        }/${_hrname}`
      );
    } catch (error) {
      setShowFailedDeleteRecord(true);
    }
  };

  const deleteRow = async (dateTime?: string) => {
    if (!user || !dateTime) return;
    // TODO: Delete health record row
    // temporary values
    const _hrname = 'ความดัน';
    const _elderlyId = '2';

    const payload = {
      hrName: _hrname,
      timestamp: moment(dateTime, 'YYYY/MM/DD HH:mm:ss').toString()
    };
    try {
      console.log(dateTime);
      const { data } = await client.delete(
        `healthRecord/healthData/${user?.isElderly ? 'elderly' : 'caretaker'}${
          user.isElderly ? '' : _elderlyId
        }`,
        { data: payload }
      );
      if (data) {
        getHealthRecordTable();
        setShowFailedDeleteRow(true);
      }
    } catch (error) {
      // TODO: Alert message
      console.log(error);
      setShowFailedDeleteRow(true);
    }
  };

  const updateImage = async () => {
    if (!newHealthRecordCover || !newHealthRecordCover.assets) return;
    // temporary value
    const _hrName = 'ความดัน';

    const newImage = newHealthRecordCover.assets[0];
    const payload = {
      hrName: _hrName,
      image: {
        base64: newImage.base64,
        name: newImage.fileName,
        type: newImage.type,
        size: newImage.fileSize
      }
    };
    try {
      const { data } = await client.put('/healthRecord/elderly', payload);
      if (data) {
        setShowSuccessImageUpdate(true);
      }
    } catch (error) {
      // TODO: Alert message
      setShowFailedDeleteRow(true);
    }
  };

  const onNewPictureObtained = (result: ImagePickerResponse) => {
    setNewHealthRecordCover(result);
  };

  const onDeleteRow = (dateTime: string) => {
    setTempDatetime(dateTime);
    setShowDeleteRowConfirm(true);
  };

  const onDeleteHealthRecord = () => {
    setShowDeleteRecordConfirm(true);
  };

  useEffect(() => {
    navigation.setOptions({ title: recordTitle });
  }, []);

  return (
    <ScrollView>
      <Alert
        isOpen={showDeleteRecordConfirm}
        close={() => {
          setShowDeleteRecordConfirm(false);
          deleteHealthRecord();
        }}
        cancel={() => setShowDeleteRecordConfirm(false)}
        type={AlertType.ERROR}
        message="confirmDeleteHealthRecordingAlert"
      />
      <Alert
        isOpen={showDeleteRowConfirm}
        close={() => {
          setShowDeleteRowConfirm(false);
          deleteRow(tempDatetime);
        }}
        cancel={() => setShowDeleteRowConfirm(false)}
        type={AlertType.ERROR}
        message="confirmDeleteHealthDataRowAlert"
        customString={`${moment(tempDatetime).format('DD/MM/YYYY HH:MM:SS')}?`}
      />
      <Alert
        isOpen={showFailedDeleteRow}
        close={() => setShowFailedDeleteRow(false)}
        type={AlertType.ERROR}
        message="deleteHealthDataRowError"
      />
      <Alert
        isOpen={showFailedDeleteRecord}
        close={() => setShowFailedDeleteRecord(false)}
        type={AlertType.ERROR}
        message="deleteHealthRecordingError"
      />
      <Alert
        isOpen={showSuccessImageUpdate}
        close={() => setShowSuccessImageUpdate(false)}
        type={AlertType.SUCCESS}
        message="deleteHealthRecordingError"
      />
      <Alert
        isOpen={showFailedImageUpdate}
        close={() => setShowFailedImageUpdate(false)}
        type={AlertType.ERROR}
        message="deleteHealthRecordingError"
      />
      <View p={4}>
        <Text fontSize="xl" fontWeight="700">
          {t('healthRecording.generalInfo')}
        </Text>
        <Spacer />
        <View>
          <Text>{t('healthRecording.title')}</Text>
          <Text fontSize="md" fontWeight="bold">
            {route.params.healthData?.tableName}
          </Text>
        </View>
        <Spacer />
        <View
          display="flex"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          width="full"
          height={200}
          background="red.100">
          <Image
            source={getImage()}
            borderRadius={4}
            alt="Profile Picture"
            resizeMode="cover"
            height="100%"
            width="100%"
          />
        </View>
        <Spacer />
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <Button
            width={ScreenWidth / 2 - 22}
            onPress={() => takePicture(onNewPictureObtained)}>
            {t('userForm.takePic')}
          </Button>
          <Spacer />
          <Button
            width={ScreenWidth / 2 - 22}
            onPress={() => selectPictureFromDevice(onNewPictureObtained)}>
            {t('userForm.fromDevice')}
          </Button>
        </View>
        <Spacer />

        <HealthDataTable
          mode={TableMode.EDIT}
          onDeleteRow={onDeleteRow}
          healthData={healthTable}
        />
        <Spacer />
        <Button
          onPress={handleSubmit(updateImage)}
          isDisabled={!newHealthRecordCover}>
          {t('healthRecording.save')}
        </Button>
        <Spacer />
        <Button
          variant="outline"
          colorScheme="secondary"
          onPress={onDeleteHealthRecord}>
          {t('healthRecording.deleteRecording')}
        </Button>
        <Spacer />
      </View>
    </ScrollView>
  );
};

export default EditHealthEntryScreen;
