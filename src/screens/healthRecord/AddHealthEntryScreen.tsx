import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { Button, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/atoms/Divider';
import Spacer from '../../components/atoms/Spacer';
import TextInput from '../../components/atoms/TextInput';
import DatePicker from '../../components/molecules/DatePicker';
import TimePicker from '../../components/molecules/TimePicker';
import { RootStackParamList } from '../../navigation/types';
import HealthDataTable from './HealthDataTable';
import HealthRecordInfoSection from './HealthRecordInfoSection';

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
    console.log(data);
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
        <HealthRecordInfoSection />
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
        <DatePicker date={date} onDateChange={onDateChange} />
        <Spacer />
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
        <HealthDataTable />
      </View>
    </ScrollView>
  );
};

export default AddHealthEntry;
