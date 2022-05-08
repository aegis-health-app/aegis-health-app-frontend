import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { View, Text, AspectRatio, Box, Heading, Image } from 'native-base';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts/UserContext';
import { Reminder } from '../../interfaces/reminders';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import moment from 'moment';
import {
  deleteReminderCaretaker,
  deleteReminderElderly,
  markAsCompletedElderly,
  markAsNotCompleteElderly
} from '../../utils/reminders';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

interface Props {
  data: Reminder;
  isOverdue?: boolean;
  isFinished?: boolean;
  lastIndex: boolean;
}

const ReminderItem = ({ data, isOverdue, isFinished, lastIndex }: Props) => {
  const {
    rid,
    title,
    note,
    importanceLevel,
    imageid,
    hour,
    minute,
    isRecurring
  } = data;
  const { isElderly } = useContext(UserContext);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isVisible, setVisible] = useState<boolean>(true);

  const markAsCompleteHandler = async (rid) => {
    const currentDate = moment(new Date()).add(7, 'h').toDate();
    if (isElderly) {
      await markAsCompletedElderly(rid, currentDate);
      setVisible(false);
    }
  };

  const markAsNotCompleteHandler = async (rid) => {
    if (isElderly) {
      await markAsNotCompleteElderly(rid);
      setVisible(false);
    }
  };

  const deleteHandler = async (rid) => {
    if (isElderly) {
      await deleteReminderElderly(rid);
    } else {
      await deleteReminderCaretaker(currentElderlyUid, rid);
    }
    setVisible(false);
  };

  const sidebarColor = isOverdue ? '#FDBA74' : '#7CC2FF';

  if (isVisible)
    return (
      <View flex={1} flexDirection="row" mb={4}>
        <View flex={1} alignItems="center" h="full" mr="3">
          <View
            justifyContent="center"
            alignItems="center"
            backgroundColor={sidebarColor}
            w="100%"
            h="8"
            mb="2"
            rounded="md">
            <Text fontSize={16} fontWeight="medium">
              {hour.toString().length > 1 ? hour : `0${hour}`}:
              {minute.toString().length > 1 ? minute : `0${minute}`}
            </Text>
          </View>
          {!lastIndex && (
            <View flex={1} backgroundColor={sidebarColor} w="1" h="full" />
          )}
        </View>
        <Box flex={5} shadow="2" rounded="lg" style={styles.card}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ReminderInfoScreen', { info: { rid: rid } })
            }>
            {imageid && (
              <AspectRatio w="100%">
                <Image
                  source={{ uri: imageid }}
                  alt="reminder image"
                  w="100%"
                  h="100%"
                  roundedTop="lg"
                />
              </AspectRatio>
            )}
            <View
              p="4"
              backgroundColor="white"
              roundedTop={imageid ? null : 'lg'}
              roundedBottom={!isRecurring || isFinished ? null : 'lg'}>
              <Heading size={['md', 'lg', 'md']} fontWeight="medium">
                <Text style={styles.priority}>
                  {importanceLevel === 'Medium'
                    ? '! '
                    : importanceLevel === 'High'
                    ? '!!! '
                    : null}
                </Text>
                {title}
              </Heading>
              {note ? <Text>{note}</Text> : null}
            </View>
          </TouchableOpacity>
          {isElderly && !isRecurring && !isFinished && (
            <View
              flexDirection="row"
              justifyContent="flex-end"
              px="3"
              py="2"
              backgroundColor="#F1F1F1"
              roundedBottom="lg">
              <TouchableOpacity onPress={() => markAsCompleteHandler(rid)}>
                <Text color="#005DB4">{t('reminders.markAsComplete')}</Text>
              </TouchableOpacity>
            </View>
          )}
          {isFinished && (
            <View
              flexDirection="row"
              justifyContent="space-between"
              px="3"
              py="2"
              backgroundColor="#F1F1F1"
              roundedBottom="lg">
              <TouchableOpacity onPress={() => deleteHandler(rid)}>
                <View backgroundColor="#FDBA74" px={5} rounded="md">
                  <Text color="#C2410C">{t('reminders.delete')}</Text>
                </View>
              </TouchableOpacity>
              {isElderly && (
                <TouchableOpacity onPress={() => markAsNotCompleteHandler(rid)}>
                  <Text color="#C2410C">{t('reminders.markAsIncomplete')}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Box>
      </View>
    );
  else return <></>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8
  },
  priority: {
    color: '#C2410C'
  }
});

export default ReminderItem;
