import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { ReminderRepeatitionPattern } from '../../constants/ReminderRepeatitionConstants';
import { UserContext } from '../../contexts/UserContext';
import CustomRecurringModal from '../organisms/CustomRecurringModal';
import ImportanceLevelInfoCard from './ImportanceLevelInfoCard';

const ReminderForm = ({
  control,
  errors,
  date,
  setDate,
  image,
  setImage,
  notifyMyCaretakers,
  setNotifyMyCaretaker,
  repeatition,
  setRepeatition,
  title,
  note,
  importanceLevel,
  setImportanceLevel
}: {
  control: any;
  errors: any;
  date: Date;
  setDate: (date: Date) => void;
  image?: ImagePickerResponse;
  setImage: (image: ImagePickerResponse) => void;
  notifyMyCaretakers: boolean;
  setNotifyMyCaretaker: (value: boolean) => void;
  repeatition: string;
  setRepeatition: (repeatition: string) => void;
  title?: string;
  note?: string;
  importanceLevel: string;
  setImportanceLevel: (importanceLavel: string) => void;
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
    {
      label: 'Low',
      value: 'low'
    },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
  ];

  useEffect(() => {
    repeatition === 'custom' && setShowCustomModal(true);
  }, [repeatition]);

  return (
    <>
      <ScrollView>
        <View p={4} marginBottom={12}>
          <CustomRecurringModal
            dialogOpen={showCustomModal}
            setDialogOpen={setShowCustomModal}
            defaultRepeatition={'doesNotRepeat'}
            setRepeatition={setRepeatition}
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
                  {getFormattedDate(date, language)}
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
          <ExpansibleToggle title={t('reminderForm.advance')}>
            <View>
              <Text fontSize={16} mb={2}>
                {t('reminderForm.repeat')}
              </Text>
              <RadioButtonGroup
                selections={ReminderRepeatitionPattern.map((r) => {
                  return {
                    label: t(`reminderRepeatitionPattern.${r.label}`),
                    value: r.value
                  };
                })}
                value={repeatition}
                setValue={setRepeatition}
              />
            </View>
            {!isElderly ? (
              <></>
            ) : (
              <>
                <Spacer />
                <View>
                  <View style={styles.itemRow}>
                    <Text fontSize={16} mb={2}>
                      {t('reminderForm.importanceLevel')}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowImportanceLevelInfoModal(true)}>
                      <QuestionIcon name="question" size="6"/>
                    </TouchableOpacity>
                  </View>

                  <DropDownSelect
                    value={importanceLevel}
                    items={importantLevels}
                    setValue={setImportanceLevel}
                  />
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
                  Take a Picture
                </Button>
                <Button
                  w="48%"
                  onPress={() => selectPictureFromDevice(onNewPictureUpload)}>
                  From my Device
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
  }
});
