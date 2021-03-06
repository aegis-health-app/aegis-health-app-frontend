import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Button,
  HStack,
  Icon,
  Spacer,
  Box,
  View,
  Image
} from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { RootStackParamList } from '../../navigation/types';
import ReminderStatusBar, {
  ReminderStatus,
  statusDecoration
} from '../../components/atoms/ReminderStatusBar';
import FormHeader from '../../components/atoms/FormHeader';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { client } from '../../config/axiosConfig';
import { Reminder } from '../../dto/modules/reminder.dto';

import { ReminderInfoScreenRecursion } from '../../constants/ReminderRepetitionConstants';
import Divider from '../../components/atoms/Divider';
import { useLanguage } from '../../internationalization/useLanguage';
import { UserContext } from '../../contexts/UserContext';

const ReminderInfoScreen = ({ route }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const { isElderly } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const reminderId = useMemo<string>(() => route?.params.info.rid, [route]);
  const elderlyId = useMemo<number>(() => route?.params.info.eid, [route]);

  const [reminderInfo, setReminder] = useState<Reminder>();
  const isCloseToReminder = useMemo<boolean>(
    () =>
      moment(reminderInfo?.startingDateTime).diff(Date.now(), 'minutes') <= 30,
    [reminderInfo]
  );
  const isRecurring = useMemo<boolean>(
    () =>
      reminderInfo?.recursion !== undefined ||
      reminderInfo?.customRecursion?.days?.length !== 0 ||
      reminderInfo?.customRecursion?.dates?.length !== 0,
    [reminderInfo]
  );

  const reminderStatus = useMemo<ReminderStatus>(() => {
    if (route?.params.info.isDone || reminderInfo?.isDone)
      return ReminderStatus.DONE;
    if (moment(reminderInfo?.startingDateTime).isBefore(Date.now()))
      return ReminderStatus.OVERDUE;
    return ReminderStatus.PENDING;
  }, [route, reminderInfo]);

  const getRecursionLevel = useCallback(() => {
    const { recursion, customRecursion } = reminderInfo ?? {};

    if (recursion) return t(ReminderInfoScreenRecursion[recursion]);
    if (
      customRecursion?.days?.length !== 0 ||
      customRecursion?.dates?.length !== 0
    )
      return t('reminder.customRecursion');
    return t('reminder.noRecursion');
  }, [reminderInfo]);

  useAsyncEffect(async () => {
    if (reminderId) {
      const reminderData = (
        await client.get<Reminder>(
          isElderly
            ? `/reminder/elderly/${reminderId}`
            : `/reminder/caretaker/${elderlyId}/${reminderId}`
        )
      ).data;

      reminderData.startingDateTime = moment(reminderData.startingDateTime)
        .add(-7, 'h')
        .toDate();

      setReminder(reminderData);
    }
  }, [reminderId, setReminder, isElderly]);

  const editReminder = useCallback(() => {
    if (reminderInfo) {
      const {
        title,
        startingDateTime,
        isRemindCaretaker,
        note,
        importanceLevel,
        recursion,
        customRecursion
      } = reminderInfo;

      navigation.navigate('EditReminderScreen', {
        info: {
          title,
          startingDateTime: new Date(startingDateTime),
          isRemindCaretaker,
          note,
          importanceLevel,
          recursion,
          customRecursion,
          rid: parseInt(reminderId, 10),
          image: undefined
        }
      });
    }
  }, [reminderId, reminderInfo]);

  const buttonMessages = useMemo(() => {
    return {
      PENDING: 'reminder.markComplete',
      OVERDUE: 'reminder.markComplete',
      DONE: 'reminder.markNotComplete'
    };
  }, []);

  const updateReminderStatus = useCallback(async () => {
    try {
      if (reminderStatus === ReminderStatus.DONE) {
        const updateResponse = await client.put(
          isElderly
            ? '/reminder/markAsNotComplete/elderly'
            : `/reminder/markAsNotComplete/caretaker/${elderlyId}`,
          {
            rid: parseInt(reminderId, 10)
          }
        );
        if (updateResponse.status === 200)
          setReminder((prev) => {
            return prev ? { ...prev, isDone: false } : undefined;
          });
      } else {
        const updateResponse = await client.put(
          isElderly
            ? '/reminder/markAsComplete/elderly'
            : `/reminder/markAsComplete/caretaker/${elderlyId}`,
          {
            rid: parseInt(reminderId, 10),
            currentDate: moment(Date.now()).toISOString()
          }
        );
        if (updateResponse.status === 200)
          setReminder((prev) => {
            return prev ? { ...prev, isDone: true } : undefined;
          });
      }
    } catch (e) {
      console.log(e?.response.data);
    }
  }, [reminderStatus, elderlyId]);

  return (
    <View px={5}>
      {!isRecurring && <ReminderStatusBar status={reminderStatus} />}
      <Spacer my={2} />
      <HStack justifyContent="space-between">
        <FormHeader headerText={reminderInfo?.title ?? ''} />
        <Button
          background="muted.200"
          onPress={editReminder}
          leftIcon={
            <Icon
              ml="-1"
              as={MaterialCommunityIcons}
              name="pencil"
              size="5"
              color="muted.600"
            />
          }>
          <Text color="muted.600">{t('reminder.edit')}</Text>
        </Button>
      </HStack>
      <HStack my={2}>
        <Box
          backgroundColor={statusDecoration[reminderStatus].chip}
          p={1}
          mr={2}
          borderRadius={2}>
          {moment(reminderInfo?.startingDateTime).format('DD/MM/YYYY')}
        </Box>
        <Box
          backgroundColor={statusDecoration[reminderStatus].chip}
          p={1}
          borderRadius={2}>
          {moment(reminderInfo?.startingDateTime).format(
            `HH:mm ${language() === 'en' ? 'A' : '???.'}`
          )}
        </Box>
      </HStack>
      <Spacer />
      <HStack my={2}>
        <Text mr={2} color="muted.600">
          {t('reminder.repeat')}
        </Text>
        <Text>{getRecursionLevel()}</Text>
      </HStack>
      <Divider />
      <Text>{reminderInfo?.note}</Text>
      <Spacer my={2} />
      {reminderInfo?.imageid && (
        <Image
          source={{ uri: reminderInfo.imageid }}
          width="full"
          height="sm"
          borderRadius={4}
          marginRight={4}
          alt="Profile Picture"
        />
      )}
      {isCloseToReminder && isElderly && !isRecurring && (
        <Button
          colorScheme={reminderStatus === ReminderStatus.DONE ? 'red' : 'blue'}
          w="full"
          mt={6}
          onPress={updateReminderStatus}>
          {t(buttonMessages[reminderStatus])}
        </Button>
      )}
      {!isCloseToReminder && isElderly && !isRecurring && (
        <Text textAlign="center">{t('reminder.timeLimit')}</Text>
      )}
    </View>
  );
};

export default ReminderInfoScreen;
