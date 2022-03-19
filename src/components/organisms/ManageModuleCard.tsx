import { StyleSheet } from 'react-native';
import { Text, View, Button, AlertDialog } from 'native-base';
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type ManageModuleCardProps = {
  icon: any;
  title: string;
  description: string;
  isAdded?: boolean;
  comingSoon?: boolean;
};

/**
 *
 * @param icon - native-base icon
 * @param title - module title
 * @param description - module description
 * @param isAdded - determiner if the user already have this module on
 * @param comingSoon - (optional, if isAdded field is undefined) readiness of the module
 * Card for ManageModule screen.
 */
const ManageModuleCard = ({
  icon,
  title,
  description,
  isAdded,
  comingSoon
}: ManageModuleCardProps) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef(null);

  function handlePressButton() {
    if (!isAdded) {
      setDialogOpen(true);
    }
  }

  function handlePressDelete() {
    setDialogOpen(false);
    //TODO: Remove Module
  }

  return (
    <View style={styles.card} bgColor="white" p={4} mb={2} w="full">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{t('51')}</AlertDialog.Header>
          <AlertDialog.Body>{t('52')}</AlertDialog.Body>
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
      <View flexDir="row">
        {icon}
        <View flex={1}>
          <Text fontWeight="600" fontSize="xl">
            {title}
          </Text>
          <Text>{description}</Text>
        </View>
      </View>
      <View mt={2}>
        {comingSoon ? (
          <Button variant="outline" colorScheme="muted">
            {t('50')}
          </Button>
        ) : (
          <>
            {isAdded ? (
              <Button variant="outline" colorScheme="primary">
                {t('48')}
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="error"
                onPress={handlePressButton}>
                {t('49')}
              </Button>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ManageModuleCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  }
});
