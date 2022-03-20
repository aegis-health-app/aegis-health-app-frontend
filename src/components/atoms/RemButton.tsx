import React from 'react';
import { Box, Button, AlertDialog, View, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';

const RemButton = () => {
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
          <AlertDialog.Header>{t('120')}</AlertDialog.Header>
          <AlertDialog.Body>{t('119')}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                {t('11')}
              </Button>
              <Button
                colorScheme="danger"
                onPress={handlePressDelete}
                ref={cancelRef}>
                {t('53')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Button
        colorScheme="danger"
        width="92%"
        size="md"
        variant="outline"
        onPress={() => handlePressButton()}>
        {t('101')}
      </Button>
    </Box>
  );
};

export default RemButton;
