import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import DateTimePicker, {
  AndroidNativeProps
} from '@react-native-community/datetimepicker';
import { useSettings } from '../../hooks/useSettings';
import { getFormattedDate } from '../../utils/getFormattedDate';

type DatePickerProps = {
  date: Date;
  onDateChange: (event, selectedDate: Date | undefined) => void;
};

const DatePicker = (props: DatePickerProps) => {
  const { date, onDateChange } = props;
  const { t } = useTranslation();
  const { language } = useSettings();
  const [mode, setMode] = useState('date');
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
      {(Platform.OS === 'ios' || show) && (
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          {Platform.OS === 'ios' && (
            <Text w={100}>{getFormattedDate(date, language)}</Text>
          )}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={onDateChange}
            mode={mode as AndroidNativeProps['mode']}
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

export default DatePicker;
