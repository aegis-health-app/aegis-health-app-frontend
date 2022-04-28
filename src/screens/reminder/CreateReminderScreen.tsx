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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const CreateReminderScreen = () => {
  const { t } = useTranslation();
  const { user, isElderly } = useContext(UserContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ mode: 'onTouched' });
  const watchInputs = watch();

  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState<ImagePickerResponse>();
  const [notifyMyCaretakers, setNotifyMyCaretaker] = useState<boolean>(true);
  const [repeatition, setRepeatition] = useState<RecurringInterval>(
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
    const uploadImage = image && image.assets ? image.assets[0] : undefined
    const imagePayload = {
      base64: uploadImage?.base64,
      name: uploadImage?.fileName,
      type: uploadImage?.type,
      size: uploadImage?.fileSize
    }

    const response: ReminderInfo = {
      ...data,
      startingDateTime: moment(date).add(7, 'h'),
      isRemindCaretaker: notifyMyCaretakers,
      image: imagePayload,
      recursion:
        repeatition !== RecurringInterval.CUSTOM &&
        repeatition !== RecurringInterval.DOES_NOT_REPEAT
          ? repeatition
          : null,
      importanceLevel: importanceLevel,
      eid: isElderly ? null : user?.uid
    };

    if (
      repeatition === RecurringInterval.CUSTOM &&
      repeatsEvery === RecursionPeriod.WEEK
    ) {
      response.customRecursion = {
        period: RecursionPeriod.WEEK,
        days: repeatsOnWeekday
      };
    }
    if (
      repeatition === RecurringInterval.CUSTOM &&
      repeatsEvery === RecursionPeriod.MONTH
    ) {
      response.customRecursion = {
        period: RecursionPeriod.MONTH,
        date: repeatsOnDate
      };
    }
    console.log(response);
    return createReminder(response);
  };

  const createReminder = async (payload) => {
    try {
      const res = await client.post('/reminder', payload);
      console.log('created');
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
          repeatition={repeatition}
          setRepeatition={setRepeatition}
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
