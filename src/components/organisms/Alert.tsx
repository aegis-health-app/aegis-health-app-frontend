import React from 'react';
import { AlertDialog, Button } from 'native-base';
import { AlertMessage, AlertMessages } from '../../constants/AlertMessages';

export type AlertType = 'ERROR' | 'SUCCESS' | 'INFO';

type AlertProps = {
  isOpen: boolean;
  close: () => void;
  type: AlertType;
  message: string;
};

const Alert = (props: AlertProps) => {
  const { isOpen, close, type, message } = props;

  const getMessage = (): AlertMessage | undefined => {
    return AlertMessages[message];
  };

  const primaryButtonColor = (type: AlertType) => {
    switch (type) {
      case 'ERROR':
        return 'danger';
      case 'SUCCESS':
        return 'primary';
      case 'INFO':
        return 'info';
      default:
        return 'primary';
    }
  };

  const cancelRef = React.useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={close}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{getMessage()?.header}</AlertDialog.Header>
        <AlertDialog.Body>{getMessage()?.body}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={close}
              ref={cancelRef}>
              {getMessage()?.secondaryButton}
            </Button>
            <Button colorScheme={primaryButtonColor(type)} onPress={close}>
              {getMessage()?.primaryButton}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Alert;
