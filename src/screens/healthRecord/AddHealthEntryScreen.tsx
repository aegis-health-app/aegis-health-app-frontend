import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import moment from 'moment';
import { Button, Image, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/atoms/Divider';
import EditButton from '../../components/atoms/EditButton';
import KeyboardAvoidingView from '../../components/atoms/KeyboardAvoidingView';
import Spacer from '../../components/atoms/Spacer';
import TextInput from '../../components/atoms/TextInput';
import DatePicker from '../../components/molecules/DatePicker';
import TimePicker from '../../components/molecules/TimePicker';
import Alert, { AlertType } from '../../components/organisms/Alert';
import { client } from '../../config/axiosConfig';
import { HealthRecordContext } from '../../contexts/HealthRecordContext';
import { UserContext } from '../../contexts/UserContext';
import { RootStackParamList } from '../../navigation/types';
import HealthDataTable, { TableMode } from './HealthDataTable';

const AddHealthEntry = () => {
  const { user } = useContext(UserContext);
  const {
    getHealthRecordTable,
    healthTable,
    currentHrName,
    currentElderlyUid,
    currentHrImage,
    healthRecordTemplates
  } = useContext(HealthRecordContext);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm({ mode: 'onTouched' });

  const [date, setDate] = useState(new Date());
  const [showSuccessAdd, setShowSuccessAdd] = useState<boolean>(false);
  const [showFailedAdd, setShowFailedAdd] = useState<boolean>(false);
  const [showDuplicateAdd, setShowDuplicateAdd] = useState<boolean>(false);
  const [showScreen, setShowScreen] = useState<boolean>(false);

  const shouldDisableSubmission = () => {
    const fieldValues = watch();
    let shouldDisable = true;
    for (const key in fieldValues) {
      if (fieldValues[key]) {
        shouldDisable = false;
        break;
      }
    }
    return shouldDisable;
  };

  const getImage = () => {
    const recording = healthRecordTemplates.find((template) => {
      return template.hrName === currentHrName;
    });
    if (recording && recording.imageid) return { uri: recording.imageid };
    if (recording && recording.imageid === null) return undefined;
    currentHrImage ? { uri: currentHrImage } : undefined;
  };

  const onDateChange = (event, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setDate(new Date(currentDate));
  };

  const onFormSubmit = async (value) => {
    if (!user) return;
    const fields = Object.keys(value).map((key) => {
      return {
        columnName: key,
        value: value[key]
      };
    });
    const payload = {
      hrName: currentHrName,
      timestamp: moment(date, 'YYYY/MM/DD HH:mm').add(7, 'h').startOf('minute'),
      data: fields
    };
    try {
      const { data } = await client.post(
        `healthRecord/healthData/${user?.isElderly ? 'elderly' : 'caretaker'}/${
          user.isElderly ? '' : currentElderlyUid
        }`,
        payload
      );
      if (data) {
        reset();
        getHealthRecordTable();
        setShowSuccessAdd(true);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err || !err.response) return;
      if (err.response.status === 409) setShowDuplicateAdd(true);
      else setShowFailedAdd(true);
    }
  };

  const onTimeChange = (event, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentDate = date.setTime(selectedTime.getTime());
    setDate(new Date(currentDate));
  };

  useEffect(() => {
    navigation.setOptions({ title: currentHrName });
    getHealthRecordTable();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setShowScreen(false);
      setTimeout(() => {
        setShowScreen(true);
      }, 0);
    }, [])
  );

  if (!showScreen) return null;
  return (
    <KeyboardAvoidingView>
      <Alert
        isOpen={showSuccessAdd}
        close={() => setShowSuccessAdd(false)}
        type={AlertType.SUCCESS}
        message="addHealthDataSuccess"
      />
      <Alert
        isOpen={showFailedAdd}
        close={() => setShowFailedAdd(false)}
        type={AlertType.ERROR}
        message="addHealthDataError"
      />
      <Alert
        isOpen={showDuplicateAdd}
        close={() => setShowDuplicateAdd(false)}
        type={AlertType.ERROR}
        message="duplicateHealthDataError"
      />
      <ScrollView>
        <View p={4}>
          <View flexDir="row" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="700">
              {t('healthRecording.addEntry')}
            </Text>
            <EditButton
              onPress={() => {
                navigation.navigate('EditHealthEntryScreen');
              }}
            />
          </View>
          <Spacer />
          <View
            display="flex"
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            width="full"
            height={200}
            background="muted.200">
            <Image
              source={getImage()}
              borderRadius={4}
              alt={t('healthRecording.noImageText')}
              resizeMode="cover"
              height="100%"
              width="100%"
            />
          </View>
          <Spacer />
          {healthTable?.columnNames.map((column, index) => (
            <View minH={20} key={index}>
              <TextInput
                keyboardType="numeric"
                label={`${column} (${healthTable.units[index]})`}
                placeholder={t('healthRecording.enterValue')}
                name={column}
                control={control}
                errors={errors}
              />
            </View>
          ))}
          <Spacer />
          <Text fontSize={16} mb={2}>
            {t('healthRecording.date')}
          </Text>
          <DatePicker date={date} onDateChange={onDateChange} />
          <Spacer />
          <Text fontSize={16} mb={2}>
            {t('healthRecording.time')}
          </Text>
          <TimePicker date={date} onDateChange={onTimeChange} />
          <Spacer />
          <Button
            onPress={handleSubmit(onFormSubmit)}
            isDisabled={shouldDisableSubmission()}>
            {t('healthRecording.enterValue')}
          </Button>
          <Spacer />
          <Divider />
          <Text fontSize="lg">{t('healthRecording.recordHistory')}</Text>
          <Spacer />
          <Button
            variant="outline"
            onPress={() => navigation.navigate('HealthRecordAnalyticsScreen')}>
            {t('healthRecording.viewAnalytics')}
          </Button>
          <Spacer />
          <HealthDataTable mode={TableMode.VIEW} healthData={healthTable} />
          <Spacer />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddHealthEntry;
