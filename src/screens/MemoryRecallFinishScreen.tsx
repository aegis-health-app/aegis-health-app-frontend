import { Button } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const MemoryRecallFinishScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <Button
        w="100%"
        colorScheme="primary"
        variant="solid"
        onPress={() => navigation.navigate('MemoryScreen')}>
        Exit game
      </Button>
    </SafeAreaView>
  );
};

export default MemoryRecallFinishScreen;
