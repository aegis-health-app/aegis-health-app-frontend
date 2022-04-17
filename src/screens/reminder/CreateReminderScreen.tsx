import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import ReminderForm from '../../components/organisms/ReminderForm';
import useKeyboardOpen from '../../hooks/useKeyboardOpen';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { ImagePickerResponse } from 'react-native-image-picker';

const CreateReminderScreen = () => {
  const { t } = useTranslation();

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
  const [repeatition, setRepeatition] = useState<string>('doesNotRepeat');

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
    console.log(response)
    return; response
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
