import { HStack, IBoxProps, Icon, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

export enum ReminderStatus {
  PENDING = 'PENDING',
  OVERDUE = 'OVERDUE',
  DONE = 'DONE'
}

export const statusDecoration = {
  PENDING: {
    bg: 'transparent',
    border: 'info.600',
    icon: 'information-circle',
    iconColor: 'info.600',
    chip: 'info.300'
  },
  OVERDUE: {
    bg: 'orange.100',
    border: 'transparent',
    icon: 'alert-circle',
    iconColor: 'orange.600',
    chip: 'orange.300'
  },
  DONE: {
    bg: 'emerald.100',
    border: 'transparent',
    icon: 'checkmark-circle',
    iconColor: 'emerald.600',
    chip: 'emerald.300'
  }
};

type StatusBarProps = {
  status: ReminderStatus;
} & IBoxProps;

const ReminderStatusBar: React.FC<StatusBarProps> = ({ status, ...props }) => {
  const { t } = useTranslation();

  return (
    <HStack
      justifyContent="center"
      my={4}
      mx={5}
      p={3}
      pl={0}
      backgroundColor={statusDecoration[status].bg}
      borderColor={statusDecoration[status].border}
      borderWidth={1}
      borderRadius={4}
      {...props}>
      <Icon
        mx="2"
        as={Ionicons}
        name={statusDecoration[status].icon}
        size="5"
        color={statusDecoration[status].iconColor}
      />
      <Text flex={1}>
        {status === ReminderStatus.PENDING && t('reminder.pending')}
        {status === ReminderStatus.OVERDUE && t('reminder.overdue')}
        {status === ReminderStatus.DONE && t('reminder.done')}
      </Text>
    </HStack>
  );
};

export default ReminderStatusBar;
