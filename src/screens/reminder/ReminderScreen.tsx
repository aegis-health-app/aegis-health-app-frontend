import { Text, View } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Spacer } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import {
  ImportanceLevel,
  RecurringInterval
} from '../../dto/modules/reminder.dto';
import { UserContext } from '../../contexts/UserContext';

const ReminderScreen = () => {
  const { t } = useTranslation();
  const { isElderly } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text>ReminderScreen</Text>
      <Button
        w="full"
        onPress={() =>
          navigation.navigate('CreateReminderScreen', {
            eid: isElderly ? undefined : 35
          })
        }>
        {t('reminder.addANewReminder')}
      </Button>
      <Spacer />
      <Button
        w="full"
        onPress={() =>
          navigation.navigate('EditReminderScreen', {
            info: {
              rid: 23,
              startingDateTime: new Date(),
              image: undefined,
              note: '',
              isRemindCaretaker: false,
              title: 'reminder1',
              importanceLevel: ImportanceLevel.LOW,
              recursion: RecurringInterval.EVERY_DAY
            }
          })
        }>
        {t('reminder.editAReminder')}
      </Button>
    </View>
  );
};

export default ReminderScreen;
