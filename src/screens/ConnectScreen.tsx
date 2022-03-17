import { View, Text, Image, Icon, VStack } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ConnectScreen = () => {
  return (
    <View flex={1} justifyContent="space-around" alignItems="center">
      <View justifyContent="space-around" alignItems="center">
        <Image
          source={require('../assets/images/scanme.png')}
          width="72"
          height="72"
          alt="QR Code for connecting with the caretaker."
        />
        <View flexDir="row" alignItems="center" mt={4}>
          <Text fontSize="lg" mr={4}>
            My code:
          </Text>
          <Text fontSize="2xl" bold color="orange.500">
            RICKROLL
          </Text>
        </View>
      </View>
      <VStack w="full" px={4} space={4}>
        <View flexDir="row" p={2} w="full" bgColor="#fff" style={styles.card}>
          <Icon
            as={MaterialIcons}
            name="touch-app"
            size="9"
            color="orange.500"
            mx={2}
          />
          <Text fontSize="md" style={styles.textWrapper}>
            From the Caretaker’s app, navigate to “Add Elderly” page.
          </Text>
        </View>
        <View flexDir="row" p={2} w="full" bgColor="#fff" style={styles.card}>
          <Icon
            as={MaterialIcons}
            name="qr-code-scanner"
            size="9"
            color="orange.500"
            mx={2}
          />
          <Text fontSize="md" style={styles.textWrapper}>
            Scan the QR code or enter the code shown above.
          </Text>
        </View>
      </VStack>
    </View>
  );
};

export default ConnectScreen;

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
  },
  textWrapper: {
    textWrap: 'wrap',
    flex: 1
  }
});
