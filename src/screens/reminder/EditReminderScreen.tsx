import { AlertDialog, Button, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ReminderForm from '../../components/organisms/ReminderForm';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ImagePickerResponse } from 'react-native-image-picker';

const EditReminderScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'EditReminderScreen'>) => {
  const { t } = useTranslation();
  const { info } = route.params;
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({ mode: 'onTouched' });
  const watchInputs = watch();
  const cancelRef = useRef(null);

  //   const [title, setTitle] = useState<string>("hello")
  const [date, setDate] = useState<Date>(info.dateTime);
  const [image, setImage] = useState<ImagePickerResponse | undefined>(info.image);
  const [notifyMyCaretakers, setNotifyMyCaretaker] = useState<boolean>(
    info.notifyMyCaretaker
  );
  const [repeatition, setRepeatition] = useState<string>(info.repetition);
  const [importanceLevel, setImportanceLevel] = useState<string>(info.importanceLevel);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleButtonState = () => {
    if (watchInputs.title || watchInputs.title === '') return true;
    return false;
  };

  const onSubmit = (data) => {
    const response = {
      ...data,
      date: moment(date).add(7, 'h'),
      notifyMyCaretakers: notifyMyCaretakers,
      image: image,
      repeatition: repeatition
    };
    return response;
  };
  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {t('reminder.confirmation')}
          </AlertDialog.Header>
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
                onPress={()=>{}}
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
