import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import ReminderForm from '../components/organisms/ReminderForm';
import useKeyboardOpen from '../hooks/useKeyboardOpen';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

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

  //   const [title, setTitle] = useState<string>("hello")
  const [date, setDate] = useState<Date>(info.dateTime);
  const [images, setImages] = useState<string[]>(info.images);
  const [notifyMyCaretakers, setNotifyMyCaretaker] = useState<boolean>(
    info.notifyMyCaretaker
  );
  const [repeatition, setRepeatition] = useState<string>(info.repetition);

  const handleButtonState = () => {
    if (watchInputs.title || watchInputs.title === '') return false;
    return false;
  };

  const onSubmit = (data) => {
    const response = {
      ...data,
      date: moment(date).add(7, 'h'),
      notifyMyCaretakers: notifyMyCaretakers,
      images: images,
      repeatition: repeatition
    };
    return response;
  };
  return (
    <>
      <View style={styles.container}>
        <ReminderForm
          control={control}
          errors={errors}
          date={date}
          setDate={setDate}
          images={images}
          setImages={setImages}
          notifyMyCaretakers={notifyMyCaretakers}
          setNotifyMyCaretaker={setNotifyMyCaretaker}
          repeatition={repeatition}
          setRepeatition={setRepeatition}
          title={info.title}
          note={info.note}
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
            {t('reminderForm.edit')}
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
            {t('reminderForm.edit')}
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
