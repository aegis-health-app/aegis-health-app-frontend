import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Platform,
  LayoutAnimation,
  UIManager,
  TouchableOpacity
} from 'react-native';
import TextInput from '../atoms/TextInput';
import { useSettings } from '../../hooks/useSettings';
import { Button, HStack, Text, ScrollView, View } from 'native-base';
import Spacer from '../atoms/Spacer';
import DatePicker from '../molecules/DatePicker';
import TimePicker from '../molecules/TimePicker';
import { getFormattedDate } from '../../utils/getFormattedDate';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RadioButtonGroup from '../molecules/RadioButtonGroup';
import InputField from '../atoms/InputField';

const ReminderForm = ({
  control,
  errors,
  date,
  setDate,
  images,
  setImages,
  notifyMyCaretakers,
  setNotifyMyCaretaker,
  repeatition,
  setRepeatition,
  title,
  note
}: {
  control: any;
  errors: any;
  date: Date;
  setDate: (date: Date) => void;
  images: string[];
  setImages: (images: string[]) => void;
  notifyMyCaretakers: boolean;
  setNotifyMyCaretaker: (value: boolean) => void;
  repeatition: string;
  setRepeatition: (repeatition: string) => void;
  title?: string;
  note?: string;
}) => {
  const { t } = useTranslation();
  const { language } = useSettings();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [expandAdvanceFields, setExpandAdvanceFields] =
    useState<boolean>(false);

  const onDateTimeChange = (event, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime();
    setShowDateTimePicker(false);
    setDate && setDate(new Date(currentDate));
  };

  // const onTimeChange = (event, selectedTime?: Date | undefined) => {
  //   if (!selectedTime) return;
  //   const currentDate = date.setTime(selectedTime.getTime());
  //   setShowDateTimePicker(false);
  //   setDate && setDate(new Date(currentDate));
  //   console.log('time changed');
  //   console.log(new Date(currentDate));
  // };

  const showDatePicker = () => {
    setShowDateTimePicker(true);
    setMode('date');
  };

  const showTimePicker = () => {
    setShowDateTimePicker(true);
    setMode('time');
  };

  const changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandAdvanceFields(!expandAdvanceFields);
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const repeatitionPattern = [
    {
      value: 'doesNotRepeat',
      display: 'Does Not Repeat'
    },
    {
      value: 'everyday',
      display: 'Every day'
    },
    {
      value: 'everyweek',
      display: 'Every Week'
    },
    {
      value: 'everymonth',
      display: 'Every Month'
    },
    {
      value: 'everyyear',
      display: 'Every Year'
    },
    {
      value: 'custom',
      display: 'Custom'
    }
  ];

  return (
    <>
      <ScrollView>
        <View p={4} marginBottom={12}>
          <View style={styles.title}>
            <Text fontSize="xl" fontWeight={'md'}>
              {t('reminderForm.generalInformation')}
            </Text>
          </View>
          <Spacer />
          <View style={styles.inputRow}>
            <TextInput
              label={t('reminderForm.title')}
              placeholder={t('reminderForm.title')}
              name="title"
              control={control}
              errors={errors}
              type={'text'}
              defaultValue={title}
            />
          </View>
          <View>
            <Text fontSize={16} mb={2}>
              {t('reminderForm.date')}
            </Text>
            {/* <DatePicker date={date} onDateChange = {onDateChange} /> */}
            {(Platform.OS === 'ios' || showDateTimePicker) && (
              <HStack justifyContent="space-between" alignItems="center">
                {Platform.OS === 'ios' && (
                  <Text w={100}>{getFormattedDate(date, language)}</Text>
                )}
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  onChange={onDateTimeChange}
                  mode={mode as 'time' | 'date'}
                  style={Platform.OS === 'ios' ? { width: 124 } : null}
                />
              </HStack>
            )}
            {Platform.OS === 'android' && (
              <HStack justifyContent="space-between" alignItems="center">
                <Text w={100}>{getFormattedDate(date, language)}</Text>
                <Button variant="outline" onPress={() => showDatePicker()}>
                  {t('reminderForm.selectDate')}
                </Button>
              </HStack>
            )}
          </View>
          <Spacer />

          <View>
            <Text fontSize={16} mb={2}>
              {t('reminderForm.time')}
            </Text>
            {Platform.OS === 'android' && (
              <HStack justifyContent="space-between" alignItems="center">
                <Text w={100}>{moment(date).format('LT')}</Text>
                <Button variant="outline" onPress={() => showTimePicker()}>
                  {t('reminderForm.selectTime')}
                </Button>
              </HStack>
            )}
          </View>
          <Spacer />
          <View style={styles.itemRow}>
            <Text fontSize={16} mb={2}>
              {t('reminderForm.notifyMyCaretakers')}
            </Text>
            <View style={styles.toggleButtonsContainer}>
              <Button
                variant={notifyMyCaretakers ? 'solid' : 'outline'}
                onPress={() => setNotifyMyCaretaker(true)}>
                Yes
              </Button>
              <Spacer />
              <Button
                variant={notifyMyCaretakers ? 'outline' : 'solid'}
                onPress={() => setNotifyMyCaretaker(false)}>
                No
              </Button>
            </View>
          </View>
          <View style={styles.btnTextHolder}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => changeLayout()}
              style={styles.Btn}>
              <Text fontSize={16} mb={2}>
                {t('reminderForm.advance')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: expandAdvanceFields ? undefined : 0,
                overflow: 'hidden'
              }}>
              <View>
                <Text fontSize={16} mb={2}>
                  {t('reminderForm.repeat')}
                </Text>
                <RadioButtonGroup
                  selections={repeatitionPattern}
                  value={repeatition}
                  setValue={setRepeatition}
                />
              </View>
              <Spacer />
              <View>
                <TextInput
                  label={t('reminderForm.note')}
                  placeholder={t('reminderForm.description')}
                  name="note"
                  control={control}
                  errors={errors}
                  type={'text'}
                  defaultValue={note}
                />
              </View>
              <Spacer />
              <View>
                <Text fontSize={16} mb={2}>
                  {t('reminderForm.images')}
                </Text>
                {images && images.length ? (
                  images
                ) : (
                  <Text fontSize={16} mb={2}>
                    {t('reminderForm.noImageSelected')}
                  </Text>
                )}
                <View style={styles.itemRow}>
                  <Button w="48%">Take a Picture</Button>
                  <Button w="48%">From my Device</Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ReminderForm;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  inputRow: {
    minHeight: 95
  },
  title: {
    marginTop: 28
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnTextHolder: {
    //   borderWidth: 1, borderColor: 'rgba(0,0,0,0.5)'
  },
  Btn: { paddingVertical: 10 }
});
