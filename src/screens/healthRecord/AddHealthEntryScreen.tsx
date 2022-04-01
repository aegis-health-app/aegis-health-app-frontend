import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import moment from 'moment';
import { Button, Image, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/atoms/Divider';
import EditButton from '../../components/atoms/EditButton';
import Spacer from '../../components/atoms/Spacer';
import TextInput from '../../components/atoms/TextInput';
import DatePicker from '../../components/molecules/DatePicker';
import TimePicker from '../../components/molecules/TimePicker';
import { RootStackParamList } from '../../navigation/types';
import HealthDataTable, { TableMode } from './HealthDataTable';

const tempHealthRecordCover = require('../../assets/images/profile.png');

const AddHealthEntry = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'AddHealthEntryScreen'>) => {
  const { recordTitle } = route.params;
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: 'onTouched' });

  const [date, setDate] = useState(new Date());

  const onDateChange = (event, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime() + 7 * 60 * 60 * 1000;
    setDate(new Date(currentDate));
  };

  const onFormSubmit = (data) => {
    const fields = Object.keys(data).map((key) => {
      return {
        columnName: key,
        value: data[key]
      };
    });
    const payload = {
      timestamp: moment(date, 'YYYY/MM/DD HH:mm:ss'),
      data: fields
    };
    // TODO: send payload to backend
    console.log(payload);
  };

  const onTimeChange = (event, selectedTime: Date | undefined) => {
    if (!selectedTime) return;
    const currentDate = date.setTime(selectedTime.getTime());
    setDate(new Date(currentDate));
  };

  useEffect(() => {
    navigation.setOptions({ title: recordTitle });
  }, []);

  return (
    <ScrollView>
      <View p={4}>
        <View flexDir="row" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="700">
            {t('healthRecording.addEntry')}
          </Text>
          <EditButton
            onPress={() => {
              navigation.navigate('EditHealthEntryScreen', {
                recordTitle: 'Blood Pressure'
              });
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
          background="red.100">
          <Image
            source={tempHealthRecordCover}
            borderRadius={4}
            alt="Profile Picture"
            resizeMode="cover"
            height="100%"
            width="100%"
          />
        </View>
        <Spacer />
        <View minH={20}>
          <TextInput
            label={'fieldname'}
            placeholder={t('healthRecording.enterValue')}
            name="field1"
            control={control}
            errors={errors}
          />
        </View>
        <Spacer />
        <TextInput
          label={'fieldname'}
          placeholder={t('healthRecording.enterValue')}
          name="field2"
          control={control}
          errors={errors}
        />
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
        <Button onPress={handleSubmit(onFormSubmit)}>
          {t('healthRecording.enterValue')}
        </Button>
        <Spacer />
        <Divider />
        <Text fontSize="lg">{t('healthRecording.recordHistory')}</Text>
        <Spacer />
        <Button variant="outline">{t('healthRecording.viewAnalytics')}</Button>
        <Spacer />
        <HealthDataTable mode={TableMode.VIEW} />
        <Spacer />
      </View>
    </ScrollView>
  );
};

export default AddHealthEntry;
