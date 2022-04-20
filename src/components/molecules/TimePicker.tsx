import { Button, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import DateTimePicker, {
  AndroidNativeProps
} from '@react-native-community/datetimepicker';
import moment from 'moment';

type TimePickerProps = {
  date: Date;
  onDateChange: (event, selectedDate: Date | undefined) => void;
};

const TimePicker = (props: TimePickerProps) => {
  const { date, onDateChange } = props;
  const { t } = useTranslation();
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('time');
  };

  return (
    <View w="100%">
      {(Platform.OS === 'ios' || show) && (
        <View flexDir="row" justifyContent="space-between" alignItems="center">
          {Platform.OS === 'ios' && (
            <Text w={100}>{`${moment(date).format('LT')}`}</Text>
          )}
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            onChange={(event, selectedTime) => {
              onDateChange(event, selectedTime);
              setShow(false);
            }}
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
            <Text w={100}>{`${moment(date).format('LT')}`}</Text>
            <Button onPress={() => showDatepicker()}>
              {t('userForm.editTime')}
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default TimePicker;
