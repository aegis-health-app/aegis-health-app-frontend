import React, { useContext } from 'react';
import { ScrollView, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { UserContext } from '../../contexts/UserContext';
import ReminderItem from '../../components/molecules/ReminderItem';
import ReminderDayHeader from '../../components/atoms/ReminderDayHeader';
import FormHeader from '../../components/atoms/FormHeader';
import FormDescription from '../../components/atoms/FormDescription';
import Divider from '../../components/atoms/Divider';

const RemindersCompletedScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);

  useAsyncEffect(async () => {
    if (!user) return;
    // fetchReminders();
  }, [user]);

  const reminders = [
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    },
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    },
    {
      title: 'test',
      description: 'test test test',
      date: 0,
      time: 0,
      notifyCaretakers: false,
      repeat: false,
      priority: 1,
      image: null
    }
  ];

  return (
    <View flex={1} mb={4}>
      <ScrollView flex={1} mx={4}>
        <FormHeader headerText={t('reminders.completedTitle')} mt={4} />
        <FormDescription text={t('reminders.completedDescription')} />
        <Divider />
        <ReminderDayHeader day="monday" />
        <ReminderItem />
        <ReminderItem />
      </ScrollView>
    </View>
  );
};

export default RemindersCompletedScreen;
