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
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const { getHealthRecordTable } = useContext(HealthRecordContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleSubmit } = useForm({ mode: 'onTouched' });
  const { ScreenWidth } = useDimensions();
  const { takePicture, selectPictureFromDevice } = useImageSelection();

  const [newHealthRecordCover, setNewHealthRecordCover] =
    useState<ImagePickerResponse>();

  const getImage = () => {
    if (newHealthRecordCover && newHealthRecordCover.assets)
      return { uri: newHealthRecordCover.assets[0].uri };
    // TODO: Update with initial image when available
    // if (user?.imageid) return { uri: user.imageid };
    return tempHealthRecordCover;
  };

  const onFormSubmit = (data) => {
    // TODO: Send new title and image to backend
    console.log(data);
  };

  const onDeleteHealtRecord = () => {
    // TODO: Delete health record
  };

  const onDeleteRow = async (dateTime: string) => {
    if (!user) return;
    // TODO: Delete health record row
    // temporary values
    const _hrname = 'ความดัน';
    const _elderlyId = '2';

    const payload = {
      hrName: _hrname,
      timestamp: moment(dateTime, 'YYYY/MM/DD HH:mm:ss')
    };
    try {
      console.log(
        `healthRecord/healthData/${user?.isElderly ? 'elderly' : 'caretaker'}/${
          user.isElderly ? '' : _elderlyId
        }`
      );
      const { data } = await client.delete(
        `healthRecord/healthData/${user?.isElderly ? 'elderly' : 'caretaker'}${
          user.isElderly ? '' : _elderlyId
        }`,
        { data: payload }
      );
      if (data) getHealthRecordTable();
    } catch (error) {
      // TODO: Alert message
      console.log(error);
    }
  };

  const onNewPictureObtained = (result: ImagePickerResponse) => {
    setNewHealthRecordCover(result);
  };

  useEffect(() => {
    navigation.setOptions({ title: recordTitle });
  }, []);

  return (
    <ScrollView>
      <View p={4}>
        <Text fontSize="xl" fontWeight="700">
          {t('healthRecording.generalInfo')}
        </Text>
        <Spacer />
        <View>
          <Text fontSize="lg" fontWeight="bold">
            {t('healthRecording.title')}
          </Text>
          <Text>{route.params.healthData?.tableName}</Text>
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
          healthData={route.params.healthData}
        />
        <Spacer />
        <Button onPress={handleSubmit(onFormSubmit)}>
          {t('healthRecording.save')}
        </Button>
        <Spacer />
        <Button
          variant="outline"
          colorScheme="secondary"
          onPress={() => onDeleteHealtRecord()}>
          {t('healthRecording.deleteRecording')}
        </Button>
        <Spacer />
      </View>
    </ScrollView>
  );
};

export default EditHealthEntryScreen;
