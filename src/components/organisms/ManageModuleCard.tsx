import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';
import React from 'react';

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
  return (
    <View style={styles.card} bgColor="white" p={4} mb={2} w="full">
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
              <Button variant="outline" colorScheme="error">
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
