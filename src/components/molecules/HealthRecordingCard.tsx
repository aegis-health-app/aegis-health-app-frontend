import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'native-base';
import React from 'react';

type HealthRecordingCardType = {
  backgroundColor: string;
  image: any; // FIXME: what is the type of the image?
  header: string;
  handlePress: () => void;
};

const HealthRecordingCard = ({
  backgroundColor,
  image,
  header,
  handlePress
}: HealthRecordingCardType) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={styles.card}
        backgroundColor={backgroundColor}
        mt={4}
        w="full">
        <Image
          source={image}
          alt="Plan Selection Image"
          width={100}
          height={100}
          resizeMode="contain"
          mr={3}
        />
        <View>
          {/* TODO: Return fontSize based on isElderly hook */}
          <Text padding="1" ml={2}>
            <Text style={styles.headerText}>{header}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HealthRecordingCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    flexDirection: 'row',
    borderRadius: 8
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500'
    // backgroundColor: 'blue'
  }
});