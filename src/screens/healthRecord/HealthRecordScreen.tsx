import React from 'react';
import { Button, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const HealthRecordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View p={4}>
      <Button
        onPress={() => {
          navigation.navigate('AddHealthEntryScreen', {
            recordTitle: 'Blood Pressure'
          });
        }}>
        Temp Add Blood Pressure Record
      </Button>
    </View>
  );
};

export default HealthRecordScreen;
