import React, { useContext, useState } from 'react';
import { ScrollView, View } from 'native-base';
import { useTranslation } from 'react-i18next';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { UserContext } from '../../contexts/UserContext';
import FormHeader from '../../components/atoms/FormHeader';
import FormDescription from '../../components/atoms/FormDescription';
import Divider from '../../components/atoms/Divider';
import moment from 'moment';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { Reminders } from '../../interfaces/reminders';
import {
  fetchFinishedRemindersCaretaker,
  fetchFinishedRemindersElderly
} from '../../utils/reminders';
import ReminderGroup from '../../components/molecules/ReminderGroup';

const RemindersCompletedScreen = () => {
  const { t } = useTranslation();
  const { isElderly } = useContext(UserContext);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const [date, setDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminders[]>();

  useAsyncEffect(async () => {
    const currentDate = moment(date).add(7, 'h').toDate();
    try {
      if (isElderly) {
        const res = await fetchFinishedRemindersElderly(currentDate);
        console.log(JSON.stringify(res.data, null, '\t'));
        setReminders(res.data);
      } else {
        const res = await fetchFinishedRemindersCaretaker(
          currentElderlyUid,
          currentDate
        );
        console.log(JSON.stringify(res.data, null, '\t'));
        setReminders(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  return (
    <View flex={1} mb={4}>
      <ScrollView flex={1} mx={4}>
        <FormHeader headerText={t('reminders.completedTitle')} mt={4} />
        <FormDescription text={t('reminders.completedDescription')} />
        <Divider />
        {reminders && (
          <ReminderGroup data={reminders} isOverdue={false} isFinished={true} />
        )}
      </ScrollView>
    </View>
  );
};

export default RemindersCompletedScreen;
