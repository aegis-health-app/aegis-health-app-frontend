import { StyleSheet } from 'react-native';
import { Text, View } from 'native-base';
import React from 'react';

type ModulePickerCardType = {
  backgroundColor: string;
  icon: any; // FIXME: what is the type of the icon?
  label: string;
  handlePress: () => void;
};

const ModulePickerCard = ({
  backgroundColor,
  icon,
  label,
  handlePress
}: ModulePickerCardType) => {
  return (
    <View
      w="1/2"
      h={120}
      backgroundColor={backgroundColor}
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      style={styles.card}>
      {icon}
      <Text fontWeight="400" fontSize="md">
        {label}
      </Text>
    </View>
  );
};

export default ModulePickerCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
