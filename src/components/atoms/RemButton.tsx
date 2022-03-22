import React from 'react';
import { Box, Button, AlertDialog, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';

type remButtonProps = {
  name: string;
};

const RemButton = ({ name }: remButtonProps) => {
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef(null);

  function handlePressButton() {
    setDialogOpen(true);
  }

  function handlePressDelete() {
    setDialogOpen(false);
    //TODO: Remove caretaker
  }

  return (
    <Box alignItems="center" margin="1">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{t('userLink.removeCaretaker')}</AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              {t('userLink.removeAlertBody1')}
              {name}
              {t('userLink.removeAlertBody2')}
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                {t('setting.cancel')}
              </Button>
              <Button
                colorScheme="danger"
                onPress={handlePressDelete}
                ref={cancelRef}>
                {t('misc.remove')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Button
        width="92%"
        size="md"
        borderWidth="1"
        borderColor="#F97316"
        backgroundColor="#FAFAFA"
        _text={{ color: '#F97316' }}
        _pressed={{
          borderColor: '#F94000',
          _text: { color: '#F94000' }
        }}
        onPress={() => handlePressButton()}>
        {t('userLink.removeCaretaker')}
      </Button>
    </Box>
  );
};

export default RemButton;
