import { AlertDialog, Button, View } from 'native-base';
import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ReminderForm from '../../components/organisms/ReminderForm';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ImagePickerResponse } from 'react-native-image-picker';
import {
  EditReminderInfo,
  ImportanceLevel,
  RecurringInterval,
  RecursionPeriod,
  ReminderInfo
} from '../../dto/modules/reminder.dto';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import { client } from '../../config/axiosConfig';

const EditReminderScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'EditReminderScreen'>) => {
  const { t } = useTranslation();
  const { info } = route.params;
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
  const cancelRef = useRef(null);

  const [date, setDate] = useState<Date>(info.startingDateTime);
  const [image, setImage] = useState<ImagePickerResponse | undefined>(
    info.image
  );
  const [notifyMyCaretakers, setNotifyMyCaretaker] = useState<boolean>(
    info.isRemindCaretaker
  );
  const [repeatition, setRepeatition] = useState<RecurringInterval>(
    info.recursion || RecurringInterval.DOES_NOT_REPEAT
  );
  const [importanceLevel, setImportanceLevel] = useState<ImportanceLevel>(
    info.importanceLevel
  );
  const [repeatsEvery, setRepeatsEvery] = useState<RecursionPeriod>(
    info.customRecursion?.period ?? RecursionPeriod.WEEK
  );
  const [repeatsOnDate, setRepeatsOnDate] = useState<number>(
    info.customRecursion?.date ?? 1
  );
  const [repeatsOnWeekday, setRepeatsOnWeekday] = useState<number[]>(
    info.customRecursion?.days ?? []
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

    const response: EditReminderInfo = {
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
      eid: isElderly ? null : info.eid,
      rid: info.rid
    };
    if (repeatition === RecurringInterval.CUSTOM && repeatsEvery === 'WEEK') {
      response.customRecursion = {
        period: RecursionPeriod.WEEK,
        days: repeatsOnWeekday
      };
    }
    if (repeatition === RecurringInterval.CUSTOM && repeatsEvery === 'MONTH') {
      response.customRecursion = {
        period: RecursionPeriod.MONTH,
        date: repeatsOnDate
      };
    }
    console.log(response);
    return updateReminder(response);
  };

  const updateReminder = async (payload) => {
    try {
      const res = await client.put('/reminder', payload);
      console.log('updated');
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReminder = async () => {
    if (!user) return;
    const payload = { rid: info.rid };
    try {
      const { data } = await client.delete(
        `/reminder/${user?.isElderly ? 'elderly' : `caretaker${info.eid}`}`,
        { data: payload }
      );
      console.log('deleted');
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{t('reminder.confirmation')}</AlertDialog.Header>
          <AlertDialog.Body>
            {t('reminder.deleteConfirmationDesc')}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                {t('reminder.cancel')}
              </Button>
              <Button
                colorScheme="danger"
                // onPress={handlePressRemove}
                onPress={deleteReminder}
                ref={cancelRef}>
                {t('reminder.delete')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
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
          title={info.title}
          note={info.note}
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
          height="20%"
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
          <Button
            mx={4}
            mt={4}
            variant="outline"
            colorScheme="secondary"
            onPress={() => setDialogOpen(true)}>
            {t('reminder.deleteReminder')}
          </Button>
        </View>
      )}
    </>
  );
};

export default EditReminderScreen;

const styles = StyleSheet.create({
  container: {
    height: '85%'
  }
});
