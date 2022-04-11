import React, { useCallback } from 'react';
import { AlertDialog, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { EmergencyInfo } from '../../screens/EmergencyInfoScreen';
import { useTranslation } from 'react-i18next';

export enum AlertType {
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  INFO = 'INFO'
}

type EmergencyAlertProps = {
  isOpen: boolean;
  close: () => void;
  emergencyInfo: EmergencyInfo;
};

const EmergencyAlert: React.FC<EmergencyAlertProps> = ({
  isOpen,
  close,
  emergencyInfo
}) => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const showEmergencyInfoScreen = useCallback(() => {
    close();
    navigation.push('EmergencyInfoScreen', { info: emergencyInfo });
  }, [emergencyInfo]);

  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={close}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header background="aegis.danger">
          <Text color="white">{t('emergencyNotification.header')}</Text>
        </AlertDialog.Header>
        <AlertDialog.Body>
          {t('emergencyNotification.body', { name: emergencyInfo.name })}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={close}
              ref={cancelRef}>
              {t('emergencyNotification.secondaryButton')}
            </Button>
            <Button colorScheme="danger" onPress={showEmergencyInfoScreen}>
              {t('emergencyNotification.primaryButton')}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default EmergencyAlert;
