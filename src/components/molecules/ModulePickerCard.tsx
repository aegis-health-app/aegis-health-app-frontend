import { StyleSheet, Dimensions } from 'react-native';
import { Pressable, Text, View } from 'native-base';
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
    <Pressable
      h={100}
      mx={1.5}
      my={1.5}
      backgroundColor={backgroundColor}
      borderRadius="md"
      justifyContent="center"
      style={styles.card}
      onPress={handlePress}>
      <View alignItems="center">
        {icon}
        {/* TODO: Return fontSize based on isElderly hook */}
        <Text fontWeight="400" fontSize="md" mt={2}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default ModulePickerCard;

const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  card: {
    width: width / 2.3,
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
