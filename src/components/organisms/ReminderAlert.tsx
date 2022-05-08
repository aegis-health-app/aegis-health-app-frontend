import React, { useCallback, useEffect } from 'react';
import { AlertDialog, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { useTranslation } from 'react-i18next';
import {
  cancelVibration,
  ReminderNoti,
  startEmergencyVibration
} from '../../utils/user/notification';

export enum AlertType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO'
}

type ReminderAlertProps = {
  isOpen: boolean;
  close: () => void;
  reminderInfo: ReminderNoti;
};

const ReminderAlert: React.FC<ReminderAlertProps> = ({
  isOpen,
  close,
  reminderInfo
}) => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showReminderInfoScreen = useCallback(() => {
    close();
    console.log(reminderInfo);
    navigation.push('ReminderInfoScreen', { info: reminderInfo });
  }, [reminderInfo]);

  const cancelRef = React.useRef(null);

  useEffect(() => {
    if (isOpen) startEmergencyVibration();
    else cancelVibration();
  }, [isOpen]);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={close}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header background="info.400">
          <Text color="white">{reminderInfo.title}</Text>
        </AlertDialog.Header>
        <AlertDialog.Body>{reminderInfo.note}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button onPress={showReminderInfoScreen}>
              {t('emergencyNotification.primaryButton')}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ReminderAlert;
