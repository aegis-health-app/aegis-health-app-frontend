import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, HStack, Icon, Spacer, Box, View } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReminderStatusBar, {
  ReminderStatus,
  statusDecoration
} from '../../components/atoms/ReminderStatusBar';
import FormHeader from '../../components/atoms/FormHeader';
import { ReminderNoti } from '../../utils/user/notification';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { client } from '../../config/axiosConfig';
import { Reminder } from '../../dto/modules/reminder.dto';
import moment from 'moment';
import { ReminderInfoScreenRecursion } from '../../constants/ReminderRepeatitionConstants';
import Divider from '../../components/atoms/Divider';

const mockReminder: Reminder = {
  title: 'Take your drug',
  startingDateTime: new Date(2020, 2, 31),
  isRemindCaretaker: true,
  note: 'string',
  importanceLevel: 'Low',
  recursion: 'EVERY_DAY',
  uid: 75,
  imageid: 'asd15bsads'
};

const ReminderInfoScreen = ({ route }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const reminderId = useMemo<ReminderNoti>(
    () => route?.params.info.rid,
    [route]
  );

  const [reminderInfo, setReminder] = useState<Reminder>(mockReminder);
  const reminderStatus = useMemo<ReminderStatus>(() => {
    if (route?.params.info.isDone) return ReminderStatus.DONE;
    if (Date.now() > reminderInfo.startingDateTime.getTime())
      return ReminderStatus.OVERDUE;
    return ReminderStatus.PENDING;
  }, [route]);

  const getRecursionLevel = useCallback(() => {
    const { recursion, customRecursion } = reminderInfo;

    if (recursion) return t(ReminderInfoScreenRecursion[recursion]);
    if (customRecursion) return t('reminder.customRecursion');
    return t('reminder.noRecursion');
  }, [reminderInfo]);

  useAsyncEffect(async () => {
    // const reminderData = (
    //   await client.get<Reminder>('/reminder/get/elderly', {
    //     params: {
    //       rid: reminderId
    //     }
    //   })
    // ).data;

    const reminderData = mockReminder;
    console.log(reminderData);
    setReminder(reminderData);
  }, []);

  const editReminder = useCallback(
    () =>
      navigation.navigate('EditReminderScreen', {
        info: {
          dateTime: new Date(),
          image: undefined,
          note: 'hi',
          notifyMyCaretaker: false,
          repetition: 'everyday',
          title: 'hello'
        }
      }),
    []
  );

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
