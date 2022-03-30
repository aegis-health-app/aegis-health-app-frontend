import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettings } from '../../hooks/useSettings';
import { getFormattedDate } from '../../utils/getFormattedDate';
import moment from 'moment';

type TimePickerProps = {
  date: Date;
  onDateChange: (event, selectedDate: Date | undefined) => void;
};

const TimePicker = (props: TimePickerProps) => {
  const { date, onDateChange } = props;
  const { t } = useTranslation();
  const { language } = useSettings();
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <View w="100%">
      <Text fontSize={16} mb={2}>
        {t('profile.birthDate')}
      </Text>
      {(Platform.OS === 'ios' || show) && (
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          {Platform.OS === 'ios' && (
            <Text w={100}>{`${moment(date).format('LT')}`}</Text>
          )}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={onDateChange}
            mode={mode as any}
            style={Platform.OS === 'ios' ? { width: 124 } : null}
          />
        </View>
      )}
      <View>
        {Platform.OS === 'android' && (
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text w={100}>{getFormattedDate(date, language)}</Text>
            <Button onPress={() => showDatepicker()}>
              {t('userForm.editBirthdate')}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default TimePicker;
