import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'native-base';
import React from 'react';
import images from '../../assets/images';

type HealthRecordingCardType = {
  backgroundColor: string;
  image: string;
  hrName: string;
  handlePress: () => void;
};

const HealthRecordingCard = ({
  backgroundColor,
  image,
  hrName,
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
          source={{ uri: image }}
          fallbackSource={images.healthRecording}
          alt="health recording image"
          width={100}
          height={100}
          resizeMode="cover"
          mr={3}
        />
        <View>
          {/* TODO: Return fontSize based on isElderly hook */}
          <Text padding="1" ml={2}>
            <Text style={styles.headerText}>{hrName}</Text>
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
