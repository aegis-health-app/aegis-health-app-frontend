import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import TextInput from '../atoms/TextInput';
import DropDownSelect from '../atoms/DropDownSelect';
import { useSettings } from '../../hooks/useSettings';
import {
  Button,
  HStack,
  Text,
  ScrollView,
  View,
  Image,
  QuestionIcon
} from 'native-base';
import Spacer from '../atoms/Spacer';
import { getFormattedDate } from '../../utils/getFormattedDate';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RadioButtonGroup from '../molecules/RadioButtonGroup';
import { useImageSelection } from '../../hooks/useImageSelection';
import { ImagePickerResponse } from 'react-native-image-picker';
import ExpansibleToggle from '../atoms/ExpansibleToggle';
import { ReminderRepetitionPattern } from '../../constants/ReminderRepetitionConstants';
import { UserContext } from '../../contexts/UserContext';
import CustomRecurringModal from '../organisms/CustomRecurringModal';
import ImportanceLevelInfoCard from './ImportanceLevelInfoCard';
import {
  ImportanceLevel,
  RecurringInterval,
  RecursionPeriod
} from '../../dto/modules/reminder.dto';
import AuthFooter from '../atoms/AuthFooter';

const ReminderForm = ({
  control,
  errors,
  date,
  setDate,
  image,
  setImage,
  notifyMyCaretakers,
  setNotifyMyCaretaker,
  repetition,
  setRepetition,
  title,
  note,
  importanceLevel,
  setImportanceLevel,
  repeatsEvery,
  setRepeatsEvery,
  repeatsOnWeekday,
  setRepeatsOnWeekday,
  repeatsOnDate,
  setRepeatsOnDate
}: {
  control: any;
  errors: any;
  date: Date;
  setDate: (date: Date) => void;
  image?: ImagePickerResponse;
  setImage: (image: ImagePickerResponse) => void;
  notifyMyCaretakers: boolean;
  setNotifyMyCaretaker: (value: boolean) => void;
  repetition: RecurringInterval;
  setRepetition: (repetition: RecurringInterval) => void;
  title?: string;
  note?: string;
  importanceLevel: ImportanceLevel;
  setImportanceLevel: (importanceLavel: ImportanceLevel) => void;
  repeatsEvery: RecursionPeriod;
  setRepeatsEvery: (repeatsEvery: RecursionPeriod) => void;
  repeatsOnWeekday: number[];
  setRepeatsOnWeekday: (repeatsOnWeekday: number[]) => void;
  repeatsOnDate: number;
  setRepeatsOnDate: (repeatsOnDate: number) => void;
}) => {
  const { t } = useTranslation();
  const { language } = useSettings();
  const { isElderly } = useContext(UserContext);
  const { takePicture, selectPictureFromDevice } = useImageSelection();

  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [mode, setMode] = useState('date');
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [showImportanceLevelInfoModal, setShowImportanceLevelInfoModal] =
    useState<boolean>(false);

  const onNewPictureUpload = (picture: ImagePickerResponse) => {
    setImage(picture);
  };

  const getImage = () => {
    if (image && image.assets) return { uri: image.assets[0].uri };
  };

  const onDateTimeChange = (event, selectedDate?: Date | undefined) => {
    if (!selectedDate) return;
    const currentDate = selectedDate.getTime();
    setShowDateTimePicker(false);
    setDate && setDate(new Date(currentDate));
  };

  const showDatePicker = () => {
    setShowDateTimePicker(true);
    setMode('date');
  };

  const showTimePicker = () => {
    setShowDateTimePicker(true);
    setMode('time');
  };

  const importantLevels = [
    { label: t('reminderImportanceLevel.low'), value: ImportanceLevel.LOW },
    {
      label: t('reminderImportanceLevel.medium'),
      value: ImportanceLevel.MEDIUM
    },
    { label: t('reminderImportanceLevel.high'), value: ImportanceLevel.HIGH }
  ];

  useEffect(() => {
    repetition === RecurringInterval.CUSTOM && setShowCustomModal(true);
    !(repetition === RecurringInterval.DOES_NOT_REPEAT) &&
      setImportanceLevel(ImportanceLevel.LOW);
  }, [repetition]);

  return (
    <>
      <ScrollView>
        <View p={4} marginBottom={12}>
          <CustomRecurringModal
            dialogOpen={showCustomModal}
            setDialogOpen={setShowCustomModal}
            defaultRepetition={RecurringInterval.DOES_NOT_REPEAT}
            setRepetition={setRepetition}
            repeatsEvery={repeatsEvery}
            setRepeatsEvery={setRepeatsEvery}
            repeatsOnDate={repeatsOnDate}
            setRepeatsOnDate={setRepeatsOnDate}
            repeatsOnWeekday={repeatsOnWeekday}
            setRepeatsOnWeekday={setRepeatsOnWeekday}
          />
          <ImportanceLevelInfoCard
            dialogOpen={showImportanceLevelInfoModal}
            setDialogOpen={setShowImportanceLevelInfoModal}
          />
          <View style={styles.title}>
            <Text fontSize="xl" fontWeight={'bold'}>
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
              isRequired={true}
              errorMessage={t('error.isRequired', {
                name: t('reminderForm.title')
              })}
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
                  <Text fontSize={16} fontWeight="900" w={100}>
                    {getFormattedDate(date, language)}
                  </Text>
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
                <Text fontSize={16} fontWeight="900" w={100}>
                  {moment(date).format('DD/MM/YYYY')}
                </Text>
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
                {t('reminderForm.yes')}
              </Button>
              <Spacer />
              <Button
                variant={notifyMyCaretakers ? 'outline' : 'solid'}
                onPress={() => setNotifyMyCaretaker(false)}>
                {t('reminderForm.no')}
              </Button>
            </View>
          </View>
          <ExpansibleToggle title={t('reminderForm.advance')}>
            <View>
              <Text fontSize={16} mb={2}>
                {t('reminderForm.repeat')}
              </Text>
              <RadioButtonGroup
                selections={ReminderRepetitionPattern.map((r) => {
                  return {
                    label: t(`reminderRepetitionPattern.${r.label}`),
                    value: r.value
                  };
                })}
                value={repetition}
                setValue={setRepetition}
              />
            </View>
            {isElderly ? (
              <></>
            ) : (
              <>
                <Spacer />
                <View>
                  <View style={styles.itemRow}>
                    <Text fontSize={16} mb={2}>
                      {t('reminderImportanceLevel.importanceLevel')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowImportanceLevelInfoModal(true)}>
                      <QuestionIcon name="question" size="6" />
                    </TouchableOpacity>
                  </View>
                  {repetition === RecurringInterval.DOES_NOT_REPEAT ? (
                    <DropDownSelect
                      value={importanceLevel}
                      items={importantLevels}
                      setValue={setImportanceLevel}
                    />
                  ) : (
                    <>
                      <View style={styles.disabledDropDown}>
                        <Text fontSize={13}>
                          {t('reminderImportanceLevel.low')}
                        </Text>
                      </View>
                      <Text style={styles.warningText}>
                        {t('reminderImportanceLevel.unabled')}
                      </Text>
                    </>
                  )}
                </View>
              </>
            )}
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
              {image && image.assets ? (
                <View
                  display="flex"
                  flexDir="row"
                  alignItems="center"
                  justifyContent="center"
                  width="full"
                  height={200}
                  background="red.100"
                  marginBottom={6}>
                  <Image
                    source={getImage()}
                    borderRadius={4}
                    alt="Profile Picture"
                    resizeMode="cover"
                    height="100%"
                    width="100%"
                  />
                </View>
              ) : (
                <Text fontSize={16} mb={2}>
                  {t('reminderForm.noImageSelected')}
                </Text>
              )}
              <View style={styles.itemRow}>
                <Button w="48%" onPress={() => takePicture(onNewPictureUpload)}>
                  {t('reminderForm.takeAPicture')}
                </Button>
                <Button
                  w="48%"
                  onPress={() => selectPictureFromDevice(onNewPictureUpload)}>
                  {t('reminderForm.fromMyDevice')}
                </Button>
              </View>
            </View>
          </ExpansibleToggle>
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
  disabledDropDown: {
    borderWidth: 1,
    borderColor: 'darkgray',
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  warningText: {
    fontSize: 14,
    color: 'orange',
    margin: 5,
  }
});
