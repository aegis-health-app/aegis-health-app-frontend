import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Spacer } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { ImagePickerResponse } from 'react-native-image-picker';

const ReminderScreen = () => {
  const {t} = useTranslation()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>ReminderScreen</Text>
      <Button
        w="full"
        onPress={() => navigation.navigate('CreateReminderScreen')}>
        {t('reminder.addANewReminder')}
      </Button>
      <Spacer />
      <Button
        w="full"
        onPress={() =>
          navigation.navigate('EditReminderScreen', {
            info: {
              dateTime: new Date(),
              image: undefined,
              note: 'hi',
              notifyMyCaretaker: false,
              repetition: 'everyday',
              title: 'hello'
            }
          })
        }>
        {t('reminder.editAReminder')}
      </Button>
    </View>
  );
};

export default ReminderScreen;
