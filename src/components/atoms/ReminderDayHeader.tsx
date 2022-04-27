import { ITextProps, Text } from 'native-base';
import React from 'react';

type ReminderDayHeaderProps = {
  day: string;
} & ITextProps;

const ReminderDayHeader: React.FC<ReminderDayHeaderProps> = ({
  day,
  ...props
}) => {
  return (
    <Text fontSize={16} {...props} padding={0.5} mb={4}>
      {day}
    </Text>
  );
};

export default ReminderDayHeader;
