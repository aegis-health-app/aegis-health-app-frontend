import { StyleSheet } from 'react-native';
import { Text, View, Button, AlertDialog } from 'native-base';
import React, { useState, useRef } from 'react';

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
          <AlertDialog.Header>Confirmation</AlertDialog.Header>
          <AlertDialog.Body>
            Are you sure you want to remove this module?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                Cancle
              </Button>
              <Button
                colorScheme="danger"
                onPress={handlePressDelete}
                ref={cancelRef}>
                Delete
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
            Coming Soon!
          </Button>
        ) : (
          <>
            {isAdded ? (
              <Button variant="outline" colorScheme="primary">
                Add
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="error"
                onPress={handlePressButton}>
                Remove
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
