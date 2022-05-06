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
import {
  ImportanceLevel,
  RecurringInterval,
  Reminder
} from '../../dto/modules/reminder.dto';

import { ReminderInfoScreenRecursion } from '../../constants/ReminderRepetitionConstants';
import Divider from '../../components/atoms/Divider';
import { UserContext } from '../../contexts/UserContext';
import { useLanguage } from '../../internationalization/useLanguage';

const ReminderInfoScreen = ({ route }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { user } = useContext(UserContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const reminderId = useMemo<number>(() => route?.params.info.rid, [route]);

  const [reminderInfo, setReminder] = useState<Reminder>();

  const reminderStatus = useMemo<ReminderStatus>(() => {
    if (route?.params.info.isDone) return ReminderStatus.DONE;
    if (moment(reminderInfo?.startingDateTime).isBefore(Date.now()))
      return ReminderStatus.OVERDUE;
    return ReminderStatus.PENDING;
  }, [route, reminderInfo]);

  const getRecursionLevel = useCallback(() => {
    const { recursion, customRecursion } = reminderInfo ?? {};

    if (recursion) return t(ReminderInfoScreenRecursion[recursion]);
    if (customRecursion) return t('reminder.customRecursion');
    return t('reminder.noRecursion');
  }, [reminderInfo]);

  useAsyncEffect(async () => {
    if (reminderId) {
      const reminderData = (
        await client.get<Reminder>(`/reminder/elderly/${reminderId}`)
      ).data;

      setReminder(reminderData);
    }
  }, [reminderId, setReminder]);

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
          rid: reminderId
        }
      });
    }
  }, [reminderId, reminderInfo]);

  return (
    <View px={5}>
      <ReminderStatusBar status={reminderStatus} />
      <Spacer />
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
            `HH:MM ${language() === 'en' ? 'A' : 'น.'}`
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
    </View>
  );
};

export default ReminderInfoScreen;
