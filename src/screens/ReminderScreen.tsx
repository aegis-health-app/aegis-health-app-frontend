import { Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Spacer } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const ReminderScreen = () => {
  return (
    <View>
      <Text>ReminderScreen</Text>
      <Button
        w="full"
        onPress={() => navigation.navigate('CreateReminderScreen')}>
        Add a new reminder +
      </Button>
      <Spacer />
      <Button
        w="full"
        onPress={() =>
          navigation.navigate('EditReminderScreen', {
            info: {
              dateTime: new Date(),
              images: [],
              note: 'hi',
              notifyMyCaretaker: false,
              repetition: 'everyday',
              title: 'hello'
            }
          })
        }>
        Edit a reminder
      </Button>
    </View>
  );
};

export default ReminderScreen;
