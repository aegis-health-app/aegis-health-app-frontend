import { StyleSheet } from 'react-native';
import { View, Text, Divider, VStack, HStack, Pressable } from 'native-base';
import moment from 'moment';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ReminderNoti } from '../../utils/user/notification';

type ModuleAlertCardProps = {
  notification: ReminderNoti;
  dismissNotification: () => void;
};

const ModuleAlertCard = ({
  notification,
  dismissNotification
}: ModuleAlertCardProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showReminderInfoScreen = useCallback(() => {
    navigation.push('ReminderInfoScreen', { info: notification });
  }, []);

  return (
    <View>
      <VStack px="4" py="2" backgroundColor="#fff" style={styles.card}>
        <HStack justifyContent="space-between">
          <Text color="darkBlue.600" fontSize="16">
            {t('modules.sender', { name: notification.user })}
          </Text>
          <Text color="darkBlue.600" fontSize="16">
            {moment(notification.startingDateTime).format('HH:mm')}
          </Text>
        </HStack>
        <View>
          <Text fontSize="2xl" fontWeight="500">
            {notification.title}
          </Text>
          {notification.note.length > 0 && (
            <Text fontSize="lg">{notification.note ?? ''}</Text>
          )}
        </View>
        <HStack justifyContent="space-between" mt={4} mb={1}>
          <Pressable
            flex={2}
            alignItems="center"
            onPress={showReminderInfoScreen}>
            {({ isPressed }) => (
              <Text
                fontSize={isPressed ? 'md' : 'lg'}
                color={!isPressed ? 'darkBlue.600' : '#E4E4E7'}>
                {t('modules.viewCard')}
              </Text>
            )}
          </Pressable>
          <Divider orientation="vertical" mx="6" bg="gray.200" thickness={2} />
          <Pressable flex={2} alignItems="center" onPress={dismissNotification}>
            {({ isPressed }) => (
              <Text
                fontSize={isPressed ? 'md' : 'lg'}
                color={!isPressed ? 'darkBlue.600' : '#E4E4E7'}>
                {t('modules.dismiss')}
              </Text>
            )}
          </Pressable>
        </HStack>
      </VStack>
    </View>
  );
};

export default ModuleAlertCard;

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
