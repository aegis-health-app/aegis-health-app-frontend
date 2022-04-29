import { Button, View } from 'native-base';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import ReminderForm from '../../components/organisms/ReminderForm';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { ImagePickerResponse } from 'react-native-image-picker';
import {
  ImportanceLevel,
  RecurringInterval,
  RecursionPeriod,
  ReminderInfo
} from '../../dto/modules/reminder.dto';
import { client } from '../../config/axiosConfig';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Alert, { AlertType } from '../../components/organisms/Alert';
import { AxiosError } from 'axios';

const CreateReminderScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'CreateReminderScreen'>) => {
  const { t } = useTranslation();
  const eid = route?.params?.eid;
  const { isElderly } = useContext(UserContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ mode: 'onTouched' });
  const watchInputs = watch();

  const [showCreateReminderSuccess, setShowCreateReminderSuccess] =
    useState<boolean>(false);
  const [showCreateReminderError, setShowCreateReminderError] =
    useState<boolean>(false);
  const [createReminderErrorMessage, setCreateReminderErrorMessage] = useState('')
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<ImagePickerResponse>();
  const [notifyMyCaretakers, setNotifyMyCaretaker] = useState<boolean>(true);
  const [repetition, setRepetition] = useState<RecurringInterval>(
    RecurringInterval.DOES_NOT_REPEAT
  );
  const [importanceLevel, setImportanceLevel] = useState<ImportanceLevel>(
    ImportanceLevel.LOW
  );
  const [repeatsEvery, setRepeatsEvery] = useState<RecursionPeriod>(
    RecursionPeriod.WEEK
  );
  const [repeatsOnDate, setRepeatsOnDate] = useState<number>(1);
  const [repeatsOnWeekday, setRepeatsOnWeekday] = useState<number[]>([]);

  const handleButtonState = () => {
    if (!watchInputs.title || watchInputs.title === '') return true;
    return false;
  };

  const onSubmit = (data) => {
    const uploadImage = image && image.assets ? image.assets[0] : undefined;
    const imagePayload = uploadImage
      ? {
          base64: uploadImage?.base64,
          name: uploadImage?.fileName,
          type: uploadImage?.type,
          size: uploadImage?.fileSize
        }
      : null;

    const response: ReminderInfo = {
      ...data,
      startingDateTime: moment(date).add(7, 'h').toDate(),
      isRemindCaretaker: notifyMyCaretakers,
      image: imagePayload,
      recursion:
        repetition !== RecurringInterval.CUSTOM &&
        repetition !== RecurringInterval.DOES_NOT_REPEAT
          ? repetition
          : null,
      importanceLevel: importanceLevel,
      eid: isElderly ? null : eid
    };

    if (
      repetition === RecurringInterval.CUSTOM &&
      repeatsEvery === RecursionPeriod.WEEK
    ) {
      response.customRecursion = {
        period: RecursionPeriod.WEEK,
        days: repeatsOnWeekday
      };
    }
    if (
      repetition === RecurringInterval.CUSTOM &&
      repeatsEvery === RecursionPeriod.MONTH
    ) {
      response.customRecursion = {
        period: RecursionPeriod.MONTH,
        date: repeatsOnDate
      };
    }
    return createReminder(response);
  };

  const createReminder = async (payload) => {
    try {
      const res = await client.post('/reminder', payload);
      console.log('created');
      // navigation.goBack();
      setShowCreateReminderSuccess(true);
    } catch (error) {
      const err = error as AxiosError
      if (!err || !err.response) return;
      console.log(err.response.status)
      if (err.response.status === 400) setCreateReminderErrorMessage('reminderInvalidStartingDateError')
      else if (err.response.status === 415) setCreateReminderErrorMessage("reminderUploadImageError")
      else setCreateReminderErrorMessage("createReminderError")
      setShowCreateReminderError(true);
    }
  };

  return (
    <>
      <Alert
        isOpen={showCreateReminderSuccess}
        close={() => {
          setShowCreateReminderSuccess(false);
          navigation.navigate('RemindersScreen');
        }}
        type={AlertType.SUCCESS}
        message="createReminderSuccess"
      />
      <Alert
        isOpen={showCreateReminderError}
        close={() => {
          setShowCreateReminderError(false);
          // navigation.navigate('ReminderScreen');
        }}
        type={AlertType.ERROR}
        message={createReminderErrorMessage}
      />
      <View style={styles.container}>
        <ReminderForm
          control={control}
          errors={errors}
          date={date}
          setDate={setDate}
          image={image}
          setImage={setImage}
          notifyMyCaretakers={notifyMyCaretakers}
          setNotifyMyCaretaker={setNotifyMyCaretaker}
          repetition={repetition}
          setRepetition={setRepetition}
          importanceLevel={importanceLevel}
          setImportanceLevel={setImportanceLevel}
          repeatsEvery={repeatsEvery}
          setRepeatsEvery={setRepeatsEvery}
          repeatsOnDate={repeatsOnDate}
          setRepeatsOnDate={setRepeatsOnDate}
          repeatsOnWeekday={repeatsOnWeekday}
          setRepeatsOnWeekday={setRepeatsOnWeekday}
        />
      </View>

      {useKeyboardOpen() ? (
        <View
          bottom="0"
          height="20%"
          width="100%"
          position="absolute"
          bgColor="white"
          marginTop="10%">
          <Button isDisabled={true} mx={4} mt={4}>
            {t('reminder.saveReminder')}
          </Button>
        </View>
      ) : (
        <View
          bottom="0"
          height="15%"
          width="100%"
          position="absolute"
          bgColor="white"
          marginTop="10%">
          <Button
            mx={4}
            mt={4}
            isDisabled={handleButtonState()}
            onPress={handleSubmit(onSubmit)}>
            {t('reminder.saveReminder')}
          </Button>
        </View>
      )}
    </>
  );
};

export default CreateReminderScreen;
const styles = StyleSheet.create({
  container: {
    height: '85%'
  }
});
